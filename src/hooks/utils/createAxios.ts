import axios from "axios";

export const createClient = (token: string) => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT as string;
  const headers = { Authorization: `Bearer ${token}` } as const;

  const client = axios.create({
    baseURL: endpoint,
    headers,
  });

  return client;
};
