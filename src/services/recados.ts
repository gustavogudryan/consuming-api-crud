import Recado from "../utils/interface/Recado";
import { api } from "./api";


class RecadosDataService {
    async create(recado: Recado) {
        return await api.post("/users/recados", {
            userId: recado.userId,
            title: recado.titulo,
            description: recado.descricao,
        })
    }

    async getAllUserRecados(loggedUser: string){
        return await api.get(`/users/recados?userId=${loggedUser}`)
    }

    async update(novoRecado: any){
        return await api.put(`/users/recados/${novoRecado.id}`)
    }

    async delete(id: string) {
        return await api.delete(`/users/recados/${id}`)
    }
}

const RecadosInstance = new RecadosDataService();

export { RecadosInstance };
