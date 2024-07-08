"use client";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaDownload } from "react-icons/fa";
import ProductInfoPage from "./ProductInfo";
import ProductsOnSale from "./ProductsOnSale";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { TBookingRequest } from "@/schemaValidations/booking.schema";
import { useSnackbar } from "notistack";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import ModalAdd from "./detail/ModalAdd";
import Image from "next/image";

type Props = {
  data: any;
};

const ProductDetailPage = ({ data }: Props) => {
  const methods = useForm<TBookingRequest>({
    defaultValues: {
      userId: "sdsds",
      bookingDetails: [],
    },
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
        <div className="max-w-container mx-auto px-20 pt-4">
          <div className="xl:-mt-10 -mt-7">
            <Breadcrumbs title="Combo" />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4  mb-10">
            <div className="h-full xl:col-span-2">
              <ProductsOnSale dataSource={data.services} />
            </div>

            <div className="h-full xl:col-span-5">
              <Image
                src={data.image}
                alt={data.image}
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>

            <div className="h-full w-full md:col-span-2 xl:col-span-5 xl:px-4 flex flex-col gap-6 justify-center">
              <ProductInfoPage data={data} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProductDetailPage;
