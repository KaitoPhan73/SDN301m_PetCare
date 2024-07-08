import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import SiderBarConfig from "./SiderBarConfig";
import { RoleEnum } from "@/enums/role";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TLoginResponse } from "@/schemaValidations/auth.schema";
import userApi from "@/actions/users";
import items from "./SiderBar";

const { Sider } = Layout;
const { AdminSiderBarConfig, UserSiderBarConfig, ManagerSideBarConfig } = SiderBarConfig;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
  setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
  selectedKeys: string[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SidebarComponent = ({
  collapsed,
  openKeys,
  selectedKeys,
  setCollapsed,
  onOpenChange,
  setOpenKeys,
  setSelectedKeys,
}: SidebarProps) => {
//   const userRedux = useSelector((state: RootState) => state.user.userServer);
  const [user, setUser] = useState<TLoginResponse | undefined | null>();
//   useEffect(() => {
//     if (userRedux === null) {
//       const fetchData = async () => {
//         try {
//           const res = await userApi.getUserFromServer();
//           setUser(res.payload);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
//       fetchData();
//     } else {
//       setUser(userRedux);
//     }
//   }, [userRedux]);

  let SiderConfigs: MenuItem[];

//   switch (user?.role) {
//     case RoleEnum.Brand:
//       SiderConfigs = BrandAdminSiderBarConfig.map(
//         ({ label, key, icon, children }) => getItem(label, key, icon, children)
//       );
//       break;
//     case RoleEnum.Organization:
//       SiderConfigs = OrganizationSiderBarConfig.map(
//         ({ label, key, icon, children }) => getItem(label, key, icon, children)
//       );
//       break;
//     case RoleEnum.SystemAdmin:
//       SiderConfigs = SystemAdminSiderBarConfig.map(
//         ({ label, key, icon, children }) => getItem(label, key, icon, children)
//       );
//       break;
//     default:
//       SiderConfigs = [];
//       break;
//   }

//   const items: MenuItem[] = SiderConfigs;

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        // items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
};

export default SidebarComponent;