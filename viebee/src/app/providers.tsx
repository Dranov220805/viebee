"use client";

import React, { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { App, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { StyleProvider } from "@ant-design/cssinjs";
import { store } from "@/src/stores";
import { ThemeProvider } from "@/src/@core/provider/theme-provider";
import { SidebarProvider } from "@/src/@core/provider/sidebar-provider";
import { useMessageInit } from "@/src/@core/utils/message";
import { initializeSeedData } from "@/src/@core/utils/seed-data";
import viebeeTheme from "@/src/themes/default";

const MessageInitializer = ({ children }: { children: ReactNode }) => {
  useMessageInit();
  return <>{children}</>;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Populate rich initial mock datasets into LocalStorage if not present
    initializeSeedData();
  }, []);

  return (
    <Provider store={store}>
      <StyleProvider layer>
        <ConfigProvider theme={viebeeTheme} locale={viVN}>
          <App>
            <ThemeProvider>
              <MessageInitializer>
                <SidebarProvider>{children}</SidebarProvider>
              </MessageInitializer>
            </ThemeProvider>
          </App>
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  );
};

export default Providers;
