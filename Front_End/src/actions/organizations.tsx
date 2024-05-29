import { httpInvoice } from "@/lib/http";
import { TOrganizationsBase } from "@/types/Organization";
import { TTableResponse } from "@/types/Table";

const getOrganizations = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TOrganizationsBase>>("organizations", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const OrganizationsApi = {
  getOrganizations,
};

export default OrganizationsApi;
