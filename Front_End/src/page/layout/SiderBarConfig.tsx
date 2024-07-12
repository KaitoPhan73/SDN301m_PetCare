import PATHS from "@/route/paths";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  CoffeeOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { CoffeeMakerOutlined, StorefrontOutlined, StoreOutlined } from "@mui/icons-material";
import Link from "next/link";
const { PATH_DASHBOARD, PATH_MANAGER } = PATHS;

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
    label: "Management",
    key: "sub1",
    icon: <StorefrontOutlined />,
    children: [
      customMenuItem(PATH_DASHBOARD.user, "User Management"),
      customMenuItem(PATH_DASHBOARD.package, "Package Management"),
      customMenuItem(PATH_DASHBOARD.service, "Service Management"),
      customMenuItem(PATH_DASHBOARD.booking, "Booking Management"),
    ],
  },
  {
    label: (
      <span style={{ fontSize: "16px", fontWeight: "bold" }}>User</span>
    ),
    key: "sub2",
    icon: <UserOutlined />,
    children: [customMenuItem(PATH_DASHBOARD.customer, "Customer "),
    customMenuItem(PATH_DASHBOARD.schedule, "Schedule"),],
  },

  {
    label: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Chart</span>,
    key: "sub3",
    icon: <LineChartOutlined />,
    children: [customMenuItem(PATH_DASHBOARD.chart, "Chart"),
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