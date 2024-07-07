const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/dashboard";
const ROOT_COMPANY = "/company";
const ROOT_USER = "/users";
const ROOT_MANAGER = "/manager";

const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  brand: path(ROOT_DASHBOARD, "/brand"),
  user: path(ROOT_DASHBOARD, "/users"),
  invoice: path(ROOT_DASHBOARD, "/invoice"),
  invoicetemplate: path(ROOT_DASHBOARD, "/invoicetemplate"),
};

const PATH_USER = {
  root: ROOT_USER,
  contact: path(ROOT_DASHBOARD, "/contact"),
  about: path(ROOT_DASHBOARD, "/about"),
};

const PATH_COMPANY = {
  root: ROOT_COMPANY,
  organizations: path(ROOT_COMPANY, "/organizations"),
  partners: path(ROOT_COMPANY, "/partners"),
  stores: path(ROOT_COMPANY, "/stores"),
};

const PATH_MANAGER = {
  root: ROOT_MANAGER,
  employees: path(ROOT_MANAGER, "/employee"),
  partners: path(ROOT_MANAGER, "/partners"),
}
const PATHS = {
  PATH_DASHBOARD,
  PATH_USER,
  PATH_COMPANY,
  PATH_MANAGER
};

export default PATHS;
