"use server";
import { httpInvoice, httpMock } from "@/lib/http";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";

export const getUsers = async (params: any) =>
  httpInvoice.get<TTableResponse<TUserBase>>("/accounts", { params });
