"use client";
import { Provider } from "react-redux";
import store from "./store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";
const cache = createCache({ key: "my-prefix-key" });
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <AntdRegistry>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AntdRegistry>
      </CacheProvider>
    </Provider>
  );
};

export default AppProvider;
