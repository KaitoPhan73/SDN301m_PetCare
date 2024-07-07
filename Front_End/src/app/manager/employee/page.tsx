import userApi from "@/actions/users";
import TablePermission from "@/page/permission";

export default async function Permission() {
  const response = await userApi.getUsers();
  return <TablePermission response={response.payload} />;
}
