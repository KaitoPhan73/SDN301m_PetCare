"use client";
import React from "react";
import FormInput from "@/components/form/InputField";
import { IUser, UserSchema } from "@/schemaValidations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "@/components/form";
import roleList from "./config";
import { Grid } from "@mui/material";

const EditUser = ({ user }: { user: IUser }) => {
  console.log(user, user.username);
  const methods = useForm<IUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex font-medium text-4xl">Edit Infomation</div>
      <div className="flex">
        <FormProvider {...methods}>
          <div className="flex gap-2 flex-col ">
            <FormInput name={"username"} disabled label="Username" />
            <FormInput name={"email"} disabled label="Email" />
            <SelectField name={"role"} label={"Role"} options={roleList} />
            <SelectField
              name={"status"}
              label={"Status"}
              options={[
                { label: "Active", value: true },
                { label: "Inactive", value: false },
              ]}
            />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditUser;
