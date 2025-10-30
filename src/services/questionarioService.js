import { ApiService } from './apiService';

class QuestionarioService extends ApiService {
  constructor() {
    super('http://localhost:3001/api');
  }

  getPerguntas({ search = '' , categoria = 'Todas', tipo = 'Todas'} = {}) {
    const params = new URLSearchParams();
    if (tipo !== 'Todas') {
      params.append('tipo', tipo);
    }
    if (categoria !== 'Todas') {
      params.append('categoria', categoria);
    }
    if (search.trim()) {
      params.append('search', search.trim());
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/perguntas${query}`);
  }

  getCategorias() {
    return this.get('/categorias');
  }

  createModelo(data) {
    return this.post('/questionarios', data);
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
}

export default new QuestionarioService();
