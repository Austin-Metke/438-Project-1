import { apiFetch } from "./client";
export type LoginResp = {
  message: string;
  token: string;
  user: { userID: number; email: string };
};

//Login
export async function login(email: string, password: string): Promise<LoginResp> {
  return apiFetch<LoginResp>("login", {
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

//Delete user
export async function deleteAccount(token: string): Promise<void> {
  return apiFetch<void>("deleteAccount", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProfile(token: string) {
  return apiFetch<any>("getProfile", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`}
  });
}
