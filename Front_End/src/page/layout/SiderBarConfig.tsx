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
const { PATH_DASHBOARD,PATH_MANAGER } = PATHS;

const customMenuItem = (path: string, name: string) => {
  return {
    label: <Link href={path}>{name}</Link>,
    key: path,
  };
};
const AdminSiderBarConfig = [
  {
    label: "Home",
    key: "1",
    icon: <PieChartOutlined />,
  },
  {
    label: "Dashboard",
    key: "sub1",
    icon: <UserOutlined />,
    children: [
      customMenuItem(PATH_DASHBOARD.user, "User Manager"),
      customMenuItem(PATH_DASHBOARD.package, "Package Manager"),
      customMenuItem(PATH_DASHBOARD.service, "Service Manager"),
      customMenuItem(PATH_DASHBOARD.booking, "Booking Manager"),
      customMenuItem(PATH_DASHBOARD.chart, "Chart"),

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

const ManagerSideBarConfig = [
  {
    label: "Home",
    key: "1",
    icon: <PieChartOutlined />,
  },
  {
    label: "Dashboard",
    key: "sub1",
    icon: <UserOutlined />,
    children: [
      // customMenuItem(PATH_DASHBOARD.brand, "Brand"),
      customMenuItem(PATH_MANAGER.employees, "Employee Manager"),
      customMenuItem(PATH_MANAGER.partners, "Partners Manager"),
      // customMenuItem(PATH_DASHBOARD.invoicetemplate, "Invoice Template"),
    ],
  },
]
const SiderBarConfig = { AdminSiderBarConfig, UserSiderBarConfig, ManagerSideBarConfig };
export default SiderBarConfig;