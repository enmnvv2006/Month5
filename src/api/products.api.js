import { api } from "./axios";

export const productsApi = {
  getCategories: () => api.get("/api/categories/"),
  getProducts: (categoryId = null) => {
    if (categoryId) {
      return api.get("/api/products/", { params: { category: categoryId } });
    }
    return api.get("/api/products/");
  },
  getProductById: (id) => api.get(`/api/products/${id}`),
};
