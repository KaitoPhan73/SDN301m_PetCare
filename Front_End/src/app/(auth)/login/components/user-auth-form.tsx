"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LoginBody, TLoginBody } from "@/schemaValidations/auth.schema";
import authApi from "@/actions/auth";
import { setUser } from "@/redux/User/userSlice";
import { useDispatch } from "react-redux";
import { InputField } from "@/components/form";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
export function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<TLoginBody>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginBody) => {
    try {
      const response = await authApi.checkLogin(values);
      if (response.status === 200) {
        dispatch(setUser(response.payload.user));
        await authApi.auth({
          accessToken: response.payload.accessToken,
          user: JSON.stringify(response.payload.user),
        });
        enqueueSnackbar("Login success", { variant: "success" });
        router.push("/homepage");
        router.refresh();
      }
    } catch (error: any) {
      enqueueSnackbar(`Login failed `, { variant: "error" });
      form.reset();
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <Grid container spacing={2}>
          {/* Grid item cho trường username */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Username</p>
            <InputField name="username" label="Username" fullWidth />
          </Grid>

          {/* Grid item cho trường password */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Password</p>
            <InputField
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>

          {/* Grid item cho nút submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              className="!mt-8 w-full bg-black text-white hover:bg-gray-200 hover:text-black transition duration-300"
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
