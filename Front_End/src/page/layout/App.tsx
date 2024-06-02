"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import items from "./SiderBar";
import FooterCustom from "./Footer";
import HeaderCustom from "./Header";
import { usePathname } from "next/navigation";
const { Content, Sider } = Layout;

const SilderBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    setSelectedKeys([pathname]);

    const findOpenKeys: any = (items: any, path: any) => {
      for (let item of items) {
        if (item.children) {
          for (let child of item.children) {
            if (child.key === path) {
              return [item.key];
            }
          }
          const openKey = findOpenKeys(item.children, path);
          if (openKey.length) {
            return [item.key, ...openKey];
          }
        }
      }
      return [];
    };

    setOpenKeys(findOpenKeys(items, pathname));
  }, [pathname]);

  const onOpenChange = (keys: any) => {
    setOpenKeys(keys);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <HeaderCustom
          style={{ padding: 0, background: colorBgContainer }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <FooterCustom style={{ textAlign: "center" }} />
      </Layout>
    </Layout>
  );
};

export default SilderBar;
