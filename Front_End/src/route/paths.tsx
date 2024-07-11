const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/dashboard";
const ROOT_COMPANY = "/company";
const ROOT_USER = "/users";
const ROOT_MANAGER = "/manager";

const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  user: path(ROOT_DASHBOARD, "/users"),
  package: path(ROOT_DASHBOARD, "/packages"),
  service: path(ROOT_DASHBOARD, "/services"),
  booking: path(ROOT_DASHBOARD, "/bookings"),
  chart: path(ROOT_DASHBOARD, "/charts"),
};

const PATH_USER = {
  root: ROOT_USER,
  contact: path(ROOT_DASHBOARD, "/contact"),
  about: path(ROOT_DASHBOARD, "/about"),
};

const PATH_MANAGER = {
  root: ROOT_MANAGER,
  employees: path(ROOT_MANAGER, "/employee"),
  partners: path(ROOT_MANAGER, "/partners"),
}
const PATHS = {
  PATH_DASHBOARD,
  PATH_USER,
  PATH_MANAGER
};

export default PATHS;
