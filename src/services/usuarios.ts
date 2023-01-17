import Usuario from "../utils/interface/Usuario";
import { api } from "./api";


class UsersDataService{
    async create(user: Usuario) {
        return await api.post("/users", {
            name: user.name,
            email: user.email,
            password: user.password,
            repassword: user.repassword,
        })
    }

    async login(info: any) {
        return await api.post("/users/login", {
            email: info.email,
            password: info.password,
        })
    }
}

const usersInstance = new UsersDataService

export {usersInstance}