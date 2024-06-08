const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/dashboard";
const ROOT_COMPANY = "/company";
const ROOT_USER = "/users";

const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  admin: path(ROOT_DASHBOARD, "/admin"),
  manager: path(ROOT_DASHBOARD, "/manager"),
};



const PATHS = {
  PATH_DASHBOARD,
};

export default PATHS;
