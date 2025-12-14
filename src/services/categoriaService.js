import { ApiService } from "./apiService";

class CategoriaService extends ApiService {

  getAllCategorias() {
    return this.get("/categorias");
  }
}

export default new CategoriaService();
