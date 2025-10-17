import client from './client';

export async function fetchProducts() {
  const res = await client.get('/products');
  return res.data;
}
export async function fetchCategories() {
  const res = await client.get('/products/categories');
  return res.data;
}
export async function fetchByCategory(cat: string) {
  const res = await client.get(`/products/category/${encodeURIComponent(cat)}`);
  return res.data;
}
export async function deleteProduct(id: number) {
  const res = await client.delete(`/products/${id}`);
  return res.data;
}
