const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROOT_DASHBOARD = "/dashboard";
const ROOT_COMPANY = "/company";
const ROOT_USER = "/users";

const PATH_DASHBOARD = {
  root: ROOT_DASHBOARD,
  users: path(ROOT_DASHBOARD, "/users"),
  feedbacks: path(ROOT_DASHBOARD, "/feedbacks"),
};



const PATHS = {
  PATH_DASHBOARD,
};

export default PATHS;
