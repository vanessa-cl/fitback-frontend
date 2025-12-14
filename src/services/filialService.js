import { ApiService } from "./apiService";

class FilialService extends ApiService {

  getAllFiliais() {
    return this.get("/filiais");
  }

  getFilialById(id) {
    return this.get(`/filiais/${id}`);
  }

  createFilial(filialData) {
    return this.post("/filiais", filialData);
  }

  updateFilial(id, filialData) {
    return this.put(`/filiais/${id}`, filialData);
  }

  deleteFilial(id) {
    return this.delete(`/filiais/${id}`);
  }

  searchFiliais(termo) {
    return this.get(`/filiais/buscar/?termo=${termo}`);
  }
}

export default new FilialService();
