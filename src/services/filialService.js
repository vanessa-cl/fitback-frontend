import { ApiService } from "./apiService";

class FilialService extends ApiService {
  constructor() {
    super("http://localhost:3001/api/filiais");
  }

  getAllFiliais() {
    return this.get("/");
  }

  getFilialById(id) {
    return this.get(`/${id}`);
  }

  createFilial(filialData) {
    return this.post("/", filialData);
  }

  updateFilial(id, filialData) {
    return this.put(`/${id}`, filialData);
  }

  deleteFilial(id) {
    return this.delete(`/${id}`);
  }

  searchFiliais(termo) {
    return this.get(`/buscar/${termo}`);
  }
}

export default new FilialService();
