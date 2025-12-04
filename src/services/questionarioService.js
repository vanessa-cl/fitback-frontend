import { ApiService } from "./apiService";

class QuestionarioService extends ApiService {
  constructor() {
    super("http://localhost:3001/api");
  }

  getAllQuestionarios() {
    return this.get("/questionarios");
  }

  getPerguntasPorFiltros({ termo = "", categoria = "Todas", tipo = "Todas" } = {}) {
    const params = new URLSearchParams();
    if (tipo !== "Todas") {
      params.append("tipo", tipo);
    }
    if (categoria !== "Todas") {
      params.append("idCategoria", categoria);
    }
    if (termo.trim()) {
      params.append("termo", termo.trim());
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.get(`/perguntas/buscar${query}`);
  }

  getCategorias() {
    return this.get("/categorias");
  }

  createModelo(data) {
    return this.post("/questionarios", data);
  }

  updateModelo(id, data) {
    return this.put(`/questionarios/${id}`, data);
  }

  getModelo(id) {
    return this.get(`/questionarios/${id}`);
  }

  getModeloPerguntas(id) {
    return this.get(`/questionarios/${id}/perguntas`);
  }

  saveModeloPerguntas(id, perguntas) {
    return this.post(`/questionarios/${id}/perguntas`, { perguntas });
  }

  getModelosByQuery(termo) {
    return this.get(`/questionarios/buscar?termo=${termo}`);
  }

  deleteModelo(id) {
    return this.delete(`/questionarios/${id}`);
  }
}

export default new QuestionarioService();
