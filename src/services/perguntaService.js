import { ApiService } from "./apiService";

class PerguntaService extends ApiService {
  constructor() {
    super("http://localhost:3001/api/perguntas");
  }

  getAllPerguntas() {
    return this.get("/");
  }

  getPerguntaById(id) {
    return this.get(`/${id}`);
  }

  createPergunta(perguntaData) {
    return this.post("/", perguntaData);
  }

  updatePergunta(id, perguntaData) {
    return this.put(`/${id}`, perguntaData);
  }

  deletePergunta(id) {
    return this.delete(`/${id}`);
  }

  searchPerguntas(termo) {
    return this.get(`/buscar/${termo}`);
  }

  searchPerguntasPorCategoria(idCategoria) {
    return this.get(`/buscar?idCategoria=${idCategoria}`);
  }
}

export default new PerguntaService();
