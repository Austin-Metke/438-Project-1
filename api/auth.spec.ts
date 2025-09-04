import { getProfile, login, register, type LoginResp } from "./auth";

jest.mock("./client", () => ({
  apiFetch: jest.fn(),
}));

import { apiFetch } from "./client";

describe("auth API wrapper", () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockReset();
  });

  describe("login", () => {
    it("calls /auth/login with correct method/body and returns parsed response", async () => {
      const mockResp: LoginResp = {
        token: "jwt-123",
        user: { id: "u1", email: "a@example.com" },
      };
      (apiFetch as jest.Mock).mockResolvedValueOnce(mockResp);

      const result = await login("a@example.com", "secret");

      expect(apiFetch).toHaveBeenCalledTimes(1);
      expect(apiFetch).toHaveBeenCalledWith("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: "a@example.com", password: "secret" }),
      });
      expect(result).toEqual(mockResp);
    });

    it("errors out from apiFetch", async () => {
      const err = new Error("Network down");
      (apiFetch as jest.Mock).mockRejectedValueOnce(err);
      await expect(login("a@example.com", "secret")).rejects.toBe(err);
    });
  });

  describe("register", () => {
    it("calls register with correct method/body", async () => {
      (apiFetch as jest.Mock).mockResolvedValueOnce(undefined);

      await register("email@example.com", "password");

      expect(apiFetch).toHaveBeenCalledTimes(1);
      expect(apiFetch).toHaveBeenCalledWith("register", {
        method: "POST",
        body: JSON.stringify({ email: "email@example.com", password: "password" }),
      });
    });

    it("errors out from apiFetch", async () => {
      const err = new Error("Email already used");
      (apiFetch as jest.Mock).mockRejectedValueOnce(err);
      await expect(register("b@example.com", "hunter2")).rejects.toBe(err);
    });
  });

  describe("getProfile", () => {
    it("currently returns undefined", async () => {
      const val = await getProfile("token-abc");
      expect(val).toBeUndefined();
      expect(apiFetch).not.toHaveBeenCalled();
    });
  });
});
