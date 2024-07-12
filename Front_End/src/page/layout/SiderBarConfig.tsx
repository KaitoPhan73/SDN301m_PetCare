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
 
      customMenuItem(PATH_DASHBOARD.customer, "Customer "),
      customMenuItem(PATH_DASHBOARD.schedule, "Schedule"),
    ],
  },
  {
    label: "Company",
    key: "sub2",
    icon: <CoffeeOutlined />,
    children: [
      customMenuItem(PATH_COMPANY.organizations, "Organizations"),
      customMenuItem(PATH_COMPANY.partners, "Partners"),
      customMenuItem(PATH_COMPANY.stores, "Stores"),
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
      customMenuItem(PATH_MANAGER.schedule, "Schedule"),
      // customMenuItem(PATH_DASHBOARD.invoicetemplate, "Invoice Template"),
    ],
  },
]
const SiderBarConfig = { AdminSiderBarConfig, UserSiderBarConfig, ManagerSideBarConfig };
export default SiderBarConfig;