"use client"
import PATHS from "@/route/paths";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { CoffeeMakerOutlined } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const { PATH_DASHBOARD } = PATHS;

const customMenuItem = (path: string, name: string) => {
  return {
    label: <Link href={path}>{name}</Link>,
    key: path,
  };
};

const SidebarLogo = () => (
  <div style={{ padding: "30%", textAlign: "center", borderRadius: "100%" }}>
    <Image
      src="/images/favicon.ico"
      alt="Logo 3D"
      width={100}
      height={100}
      style={{ borderRadius: "100%", margin: "10%" }}
    />
  </div>
);

const AdminSiderBarConfig = [
  {
    label: <SidebarLogo />,
    key: "logo",
    icon: null,
  },
  {
    label: "Home",
    key: "1",
    icon: <PieChartOutlined />,
  },
  // {
  //   label: <Link href={"/dashboard"}>Dashboard</Link>,
  //   key: "2",
  //   icon: <DesktopOutlined />,
  // },
  {
    label: "Admin DashBoard",
    key: "sub1",
    icon: <UserOutlined />,
    children: [
      customMenuItem(PATH_DASHBOARD.users, "User Management"),
      customMenuItem(PATH_DASHBOARD.feedbacks, "FeedBack Management"),

    ],
  },
];

const UserSiderBarConfig = [
  {
    label: "Option 1",
    key: "1",
    icon: <PieChartOutlined />,
  },
  {
    label: "Files",
    key: "9",
    icon: <FileOutlined />,
  },
];
const SiderBarConfig = { AdminSiderBarConfig, UserSiderBarConfig };
export default SiderBarConfig;
