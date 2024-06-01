const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/dashboard";
const ROOT_COMPANY = "/company";
const ROOT = "/";

const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  brand: path(ROOT_DASHBOARD, "/brand"),
  user: path(ROOT_DASHBOARD, "/users"),
  invoice: path(ROOT_DASHBOARD, "/invoice"),
  invoicetemplate: path(ROOT_DASHBOARD, "/invoicetemplate"),
};

const PATH = {
  root: ROOT,
  contact: path(ROOT_DASHBOARD, "/homepage"),
  service: path(ROOT_DASHBOARD, "/service"),
};

const PATH_COMPANY = {
  root: ROOT_COMPANY,
  organizations: path(ROOT_COMPANY, "/organizations"),
  partners: path(ROOT_COMPANY, "/partners"),
  stores: path(ROOT_COMPANY, "/stores"),
};

const PATHS = {
  PATH_DASHBOARD,
  PATH,
  PATH_COMPANY,
};

export default PATHS;
