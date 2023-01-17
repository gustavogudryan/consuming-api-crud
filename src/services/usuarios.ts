import Usuario from "../utils/interface/Usuario";
import { api } from "./api";


class UsersDataService{
    async create(user: Usuario) {
        return await api.post("/users", {
            name: user.name,
            email: user.email,
            password: user.password,
        })
    }

    async login(loginInfo: any) {
        return await api.post("/users/login", {
            email: loginInfo.email,
            password: loginInfo.password,
        })
    }
}

const usersInstance = new UsersDataService

export {usersInstance}