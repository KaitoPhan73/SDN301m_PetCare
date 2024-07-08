"use client";
import authApi from "@/actions/auth";
import { HttpError } from "@/lib/http";
import { setUser } from "@/redux/User/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const performLogout = async () => {
      try {
        const response = await authApi.logoutFromNextClientToNextServer(true, signal);

        if (response.status === 200) {
          toast.success("Logout success");
          dispatch(setUser(null));
          localStorage.clear();
          sessionStorage.clear();
          router.push(`/login?redirectFrom=${pathname}`);
        } else {
          toast.error("Logout failed");
        }
      } catch (error) {
        if (error instanceof HttpError) {
          console.error("HTTP error occurred:", error.payload);
        } else if (error instanceof Error) {
          console.error("General error occurred:", error.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
    };

    performLogout();

    return () => {
      controller.abort(); // Hủy yêu cầu khi component unmount
    };
  }, [router, pathname, dispatch]);

  return <div>Logging out...</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
