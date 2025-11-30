import { ApiService } from "./apiService";

class CategoriaService extends ApiService {
  constructor() {
    super("http://localhost:3001/api/categorias");
  }

  getAllCategorias() {
    return this.get("/");
  }
}

export default new CategoriaService();
