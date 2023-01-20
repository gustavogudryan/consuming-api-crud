
import Recado from "../utils/interface/Recado";
import { api } from "./api";

class RecadosDataService {
  async create(recado: Recado) {
    return await api.post("/users/recados", {
      userEmail: recado.userEmail,
      titulo: recado.titulo,
      descricao: recado.descricao,
    });
  }

  async getAllUserRecados(logado: string) {
    return await api.get(`/users/recados?userEmail=${logado}`);
  }

  async update(novoRecado: any) {
    return await api.put(`/users/recados/${novoRecado.id}`, {
      titulo: novoRecado.titulo,
      descricao: novoRecado.descricao,
    });
  }

  async delete(id: string) {
    return await api.delete(`/users/recados/${id}`);
  }
}

const RecadosInstance = new RecadosDataService();

export { RecadosInstance };
