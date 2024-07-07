"use client";
import React from "react";
import FormInput from "@/components/form/InputField";
import {UserSchema} from "@/schemaValidations/user.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {SelectField} from "@/components/form";
import roleList from "./config";
import {Button} from "@mui/material";
import userApi from "@/actions/users";
import {TUser} from "@/types/User";
import {useRouter} from "next/navigation";
import PATHS from "@/route/paths";
import {useSnackbar} from "notistack";


const EditUser = ({user}: { user: TUser }) => {
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const methods = useForm<TUser>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
        },
    });
    const onSubmit = async (data: TUser) => {
        console.log("Submit", data)
        const response = await userApi.updateUser(user._id, data)
        router.push(PATHS.PATH_MANAGER.employees)
        if (response.status === 200) {
            enqueueSnackbar("Update user successfully!", {variant: "success"});
        } else {
            enqueueSnackbar("Update user failed", {variant: "error"});
        }

    }
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex font-medium text-4xl">Edit Information</div>
            <div className="flex">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="flex gap-2 flex-col ">
                            <FormInput name={"username"} disabled label="Username"/>
                            <FormInput name={"email"} disabled label="Email"/>
                            <SelectField name={"role"} label={"Role"} options={roleList}/>
                            <SelectField
                                name={"status"}
                                label={"Status"}
                                options={[
                                    {label: "Active", value: true, id: 1},
                                    {label: "Inactive", value: false, id: 2},
                                ]}
                            />
                            <Button type={"submit"}>Submit</Button>
                        </div>
                    </form>

                </FormProvider>
            </div>

        </div>
    );
};

export default EditUser;
