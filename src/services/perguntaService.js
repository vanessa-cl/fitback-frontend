import { ApiService } from "./apiService";

class PerguntaService extends ApiService {
  getAllPerguntas() {
    return this.get("/perguntas");
  }

  getPerguntaById(id) {
    return this.get(`/perguntas/${id}`);
  }

  createPergunta(perguntaData) {
    return this.post("/perguntas", perguntaData);
  }

  updatePergunta(id, perguntaData) {
    return this.put(`/perguntas/${id}`, perguntaData);
  }

  deletePergunta(id) {
    return this.delete(`/perguntas/${id}`);
  }

  searchPerguntas(termo) {
    return this.get(`/perguntas/buscar/${termo}`);
  }

  searchPerguntasPorCategoria(idCategoria) {
    return this.get(`/perguntas/buscar?idCategoria=${idCategoria}`);
  }

  getPerguntasPorFiltros({
    termo = "",
    categoria = "Todas",
    tipo = "Todas",
  } = {}) {
    const params = new URLSearchParams();

    if (termo.trim()) {
      params.append("termo", termo.trim());
    }
    if (tipo !== "Todas") {
      params.append("tipo", tipo);
    }
    if (categoria !== "Todas") {
      params.append("idCategoria", categoria);
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.get(`/perguntas/buscar${query}`);
  }
}

export default new PerguntaService();
