import client from './client';

export type LoginResp = { accessToken: string; username: string, id: number };

export async function login(username: string, password: string) {
  const resp = await client.post('/auth/login', { username, password });
  return resp.data as LoginResp;
}

export async function me() {
  const resp = await client.get('/auth/me');
  return resp.data;
}
