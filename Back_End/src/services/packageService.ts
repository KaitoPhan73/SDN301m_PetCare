import { Package, Service } from "../models";
import { IPackage } from "../types/package";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

export const getAll = (options: any): Promise<TPagination<IPackage>> => {
  return paginate(Package, options);
};

export const getOne = async (id: string): Promise<IPackage | null> => {
  try {
    const packageData = await Package.findById(id).populate("services").exec();
    return packageData;
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
};

export const insertOne = async (data: IPackage): Promise<IPackage> => {
  try {
    const servicePrices = await Promise.all(
      data.services.map((serviceId) =>
        Service.findById(serviceId).select("price").exec()
      )
    );

    const totalPrice = servicePrices.reduce((total, service) => {
      if (service) {
        return total + service.price;
      }
      return total;
    }, 0);

    const discount = data.discount || 0;
    const discountedPrice = totalPrice - totalPrice * (discount / 100);

    const newPackage = new Package({
      ...data,
      price: discountedPrice,
    });
    const savedPackage = await newPackage.save();
    return savedPackage;
  } catch (error) {
    console.error("Error inserting package:", error);
    throw error;
  }
};

export const updateOne = (
  id: string,
  data: Partial<IPackage>
): Promise<IPackage | null> => {
  return Package.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOne = (id: string) => {
  return Package.deleteOne({ _id: id });
};
