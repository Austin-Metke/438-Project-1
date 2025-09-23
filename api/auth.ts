import { apiFetch } from "./client";
export type LoginResp = {
  message: string;
  token: string;
  user: { userID: number; email: string };
};

export type UserProfile = {
  id: string;
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

type RawProfileResp = {
  profile: {
    userID: number;
    email: string;
    firstName?: string | null;
    lastName?: string | null;

  };
};

//Login
export async function login(email: string, password: string): Promise<LoginResp> {
  return apiFetch<LoginResp>("login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// Register user
export async function register(firstName: string, lastName: string, email: string, password: string): Promise<any> {
  return apiFetch<any>("register", {
    method: "POST",
    body: JSON.stringify({firstName, lastName, email, password }),
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

export async function getProfile(token: string): Promise<UserProfile> {
  const data = await apiFetch<RawProfileResp>("getProfile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const p = data.profile;
  return {
    id: String(p.userID),      // map userID -> id (string)
    email: p.email,
    firstName: p.firstName ?? null,
    lastName: p.lastName ?? null,

  };
}
