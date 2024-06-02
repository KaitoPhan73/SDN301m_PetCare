"use client";
import authApi from "@/actions/auth";
import { setUser } from "@/redux/User/userSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (accessToken === localStorage.getItem("accessToken")) {
      authApi.logoutFromNextClientToNextServer(true, signal).then((res) => {
        dispatch(setUser(null));
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
    return () => {
      controller.abort();
    };
  }, [accessToken, router, pathname, setUser]);
  return <div>page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
