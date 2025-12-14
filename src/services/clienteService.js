import { ApiService } from "./apiService";
import { unformatCPF, unformatPhone } from "../utils";

class ClienteService extends ApiService {
  getAllClientes() {
    return this.get("/clientes");
  }

  getClienteById(id) {
    return this.get(`/clientes/${id}`);
  }

  createCliente(clienteData) {
    return this.post("/clientes", {
      ...clienteData,
      cpf: unformatCPF(clienteData.cpf),
      telefone: unformatPhone(clienteData.telefone),
    });
  }

  updateCliente(id, clienteData) {
    return this.put(`/clientes/${id}`, {
      ...clienteData,
      cpf: clienteData.cpf,
      telefone: clienteData.telefone,
    });
  }

  deleteCliente(id) {
    return this.delete(`/clientes/${id}`);
  }

  searchClientes(termo) {
    return this.get(`/clientes/buscar/${termo}`);
  }
}

export default new ClienteService();
