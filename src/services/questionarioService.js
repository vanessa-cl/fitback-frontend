import { ApiService } from "./apiService";

class QuestionarioService extends ApiService {
  getAllQuestionarios() {
    return this.get("/questionarios");
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

  getModelosByQuery(termo) {
    return this.get(`/questionarios/buscar?termo=${termo}`);
  }

  deleteModelo(id) {
    return this.delete(`/questionarios/${id}`);
  }

  updateOrdemPerguntas(idModelo, novaOrdem) {
    return this.put(`/questionarios/${idModelo}/ordem-perguntas`, {
      perguntasIds: novaOrdem,
    });
  }
}

export default new QuestionarioService();
