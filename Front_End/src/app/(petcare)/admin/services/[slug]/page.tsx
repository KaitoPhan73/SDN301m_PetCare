import ServiceApi from "@/actions/service";
import UpdateServicePage from "@/page/dashboard/serviceManagement/update";
import { cookies } from "next/headers";
import React from "react";

export default async function Services({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const data = await ServiceApi.getService(params.slug);
  return <UpdateServicePage data={data.payload} />;
}
