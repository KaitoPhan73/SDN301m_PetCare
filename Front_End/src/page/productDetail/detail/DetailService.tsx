"use client";
import ServiceApi from "@/actions/service";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import React, { useEffect } from "react";

type Props = {
  data: TServiceResponse;
};
export default function ItemPackagePage({ data }: Props) {
  return (
    <div className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2">
      <div className="flex flex-col gap-2 font-titleFont">
        <p className="text-base font-medium">{data.name}</p>
      </div>
    </div>
  );
}
