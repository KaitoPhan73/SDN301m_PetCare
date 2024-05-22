import { Request, Response } from "express";
import { Service } from "../models";
import { IService } from "../types/service";

export module ServiceController{


export const getAllService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const services = await Service.find();
    console.log("service", services);

    if (services && services.length > 0) {
      res.status(200).json({
        message: "Fetch all services successfully",
        data: services,
      });
    } else {
      res.status(404).json({
        message: "Service not found",
      });
    }
  } catch (error) {
    console.error("Error fetching services: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id.trim();
    const service = Service.findById(id);

    if (service !== null) {
      res.status(200).json({
        message: "Fetch service successfully",
        data: service,
      });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error fetching a service", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const insertService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description, name, price, images } = req.body;

    console.log(req.body);

    const newService: IService = new Service({
      description,
      name,
      price,
      images,
    });

    await newService.save();

    res
      .status(201)
      .json({
        message: "Creating new service successfully",
        service: newService,
      });
  } catch (error) {
    console.error("Error add new service ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id.trim();
    const updateData = req.body;

    const service = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (service !== null) {
      res.status(200).json({ message: "Update service successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error("Error update a service", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteService = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id.trim();
      const deleteService = await Service.findByIdAndDelete(id);
      if (deleteService !== null) {
        res.status(200).json({ message: "Service deleted successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      console.error("Error deleting Service:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}