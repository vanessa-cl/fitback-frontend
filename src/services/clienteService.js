import { ApiService } from "./apiService";
import { unformatCPF, unformatPhone } from "../utils";

class ClienteService extends ApiService {
  constructor() {
    super("http://localhost:3001/api/clientes");
  }

  getAllClientes() {
    return this.get("/");
  }

  getClienteById(id) {
    return this.get(`/${id}`);
  }

  createCliente(clienteData) {
    return this.post("/", {
      ...clienteData,
      cpf: unformatCPF(clienteData.cpf),
      telefone: unformatPhone(clienteData.telefone),
    });
  }

  updateCliente(id, clienteData) {
    return this.put(`/${id}`, {
      ...clienteData,
      cpf: clienteData.cpf,
      telefone: clienteData.telefone,
    });
  }

  deleteCliente(id) {
    return this.delete(`/${id}`);
  }

  searchClientes(termo) {
    return this.get(`/buscar/${termo}`);
  }
}

export default new ClienteService();
