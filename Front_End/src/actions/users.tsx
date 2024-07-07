import {httpServer} from "@/lib/http";
import {IUser} from "@/schemaValidations/user.schema";
import {TTableResponse} from "@/types/Table";

const userApi = {
    getUsers: (params?: any) => {
        return httpServer.get<TTableResponse<IUser>>("user", {
            params,
        });
    },
    getUser: (userId: string) => {

        return httpServer.get<IUser>(`user/${userId}`);
    },
    getEmployees: () => {
        return httpServer.get<IUser[]>("employees", {});
    },
    disableUser: (userId: string) => {
        return httpServer.get<IUser>(`user/disable/${userId}`)
    },
    enableUser: (userId: string) => {
        return httpServer.get<IUser>(`user/enable/${userId}`)
    },
    updateUser: (userId: string, data: IUser) => {
        return httpServer.put<IUser>(`user/${userId}`, {
            data
        })
    }
};

export default userApi;
