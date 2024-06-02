"use client";
import { Provider } from "react-redux";
import store from "./store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const cache = createCache({ key: "my-prefix-key" });
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <AntdRegistry>{children}</AntdRegistry>
      </CacheProvider>
    </Provider>
  );
};

export default AppProvider;
