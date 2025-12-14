import axios from "axios";

export class ApiService {
  apiUrl = import.meta.env.VITE_API_URL;
  http;

  constructor() {
    this.http = axios.create({ baseURL: this.apiUrl });
  }

  async get(endpoint) {
    return this.http.get(endpoint);
  }

  async post(endpoint, body) {
    return this.http.post(endpoint, body);
  }

  async put(endpoint, body) {
    return this.http.put(endpoint, body);
  }

  async delete(endpoint) {
    return this.http.delete(endpoint);
  }

  async patch(endpoint, body) {
    return this.http.patch(endpoint, body);
  }
}
