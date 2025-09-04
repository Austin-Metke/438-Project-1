import { apiFetch } from "./client";

export type LoginResp = {
  token: string;
  user: { id: string; email: string };
};

//TODO node.js endpoint not created
export async function login(email: string, password: string): Promise<LoginResp> {
  return apiFetch<LoginResp>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Register user
export async function register(email: string, password: string): Promise<void> {
  return apiFetch<void>("register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// TODO node.js endpoint not created
export async function getProfile(token: string) {
  return;
}
