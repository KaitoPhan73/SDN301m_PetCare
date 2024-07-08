import type {MenuProps} from "antd";
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

const {UserSiderBarConfig, AdminSiderBarConfig, ManagerSideBarConfig} = SiderBarConfig;
// const admin = "admin";

const SiderConfigs = (role: string): MenuItem[] | null => {
    let rs: MenuItem[] | null = []
    if (role === "admin") {
        rs = AdminSiderBarConfig.map(({label, key, icon, children}) =>
            getItem(label, key, icon, children)
        )
    } else if (role === "manager") {
        rs = ManagerSideBarConfig.map(({label, key, icon, children}) =>
            getItem(label, key, icon, children)
        )
    }
    return rs
}

const items =  (role: string): MenuItem[] =>  SiderConfigs(role) ?? [];

export default items;
