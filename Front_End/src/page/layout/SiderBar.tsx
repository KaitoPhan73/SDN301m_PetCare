import type { MenuProps } from "antd";
import SiderBarConfig from "./SiderBarConfig";
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
  } as MenuItem;
}
const { UserSiderBarConfig, AdminSiderBarConfig } = SiderBarConfig;
const admin = "admin";

const SiderConfigs: MenuItem[] | null = admin
  ? AdminSiderBarConfig.map(({ label, key, icon, children }) =>
      getItem(label, key, icon, children)
    )
  : null;

const items: MenuItem[] = SiderConfigs ?? [];

export default items;
