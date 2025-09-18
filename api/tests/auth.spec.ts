import {
  login,
  register,
  deleteAccount,
  getProfile,
  type LoginResp,
} from "../auth";

jest.mock("../client", () => ({
  apiFetch: jest.fn(),
}));

import { apiFetch } from "../client";

describe("auth API wrapper", () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockReset();
  });

  describe("login", () => {
    it("calls login with correct method/body and returns parsed response", async () => {
      const mockResp: LoginResp = {
        message: "test",
        token: "jwt-123",
        user: { userID: 1, email: "a@example.com" },
      };
      (apiFetch as jest.Mock).mockResolvedValueOnce(mockResp);

      const result = await login("a@example.com", "secret");

      expect(apiFetch).toHaveBeenCalledTimes(1);
      expect(apiFetch).toHaveBeenCalledWith("login", {
        method: "POST",
        body: JSON.stringify({ email: "a@example.com", password: "secret" }),
      });
      expect(result).toEqual(mockResp);
    });

    it("propagates errors from apiFetch", async () => {
      const err = new Error("Network down");
      (apiFetch as jest.Mock).mockRejectedValueOnce(err);

      await expect(login("a@example.com", "secret")).rejects.toBe(err);
      expect(apiFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("register", () => {
    it("calls register with correct method/body", async () => {
      (apiFetch as jest.Mock).mockResolvedValueOnce(undefined);

      await register("email@example.com", "password");

      expect(apiFetch).toHaveBeenCalledTimes(1);
      expect(apiFetch).toHaveBeenCalledWith("register", {
        method: "POST",
        body: JSON.stringify({
          email: "email@example.com",
          password: "password",
        }),
      });
    });

    it("propagates errors from apiFetch", async () => {
      const err = new Error("Email already used");
      (apiFetch as jest.Mock).mockRejectedValueOnce(err);

      await expect(register("b@example.com", "hunter2")).rejects.toBe(err);
      expect(apiFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteAccount", () => {
    it("calls deleteAccount with DELETE and Bearer token header", async () => {
      (apiFetch as jest.Mock).mockResolvedValueOnce(undefined);

      await deleteAccount("jwt-abc");

      expect(apiFetch).toHaveBeenCalledTimes(1);
      expect(apiFetch).toHaveBeenCalledWith("deleteAccount", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer jwt-abc",
        },
      });
    });

    it("propagates errors from apiFetch", async () => {
      const err = new Error("Unauthorized");
      (apiFetch as jest.Mock).mockRejectedValueOnce(err);

      await expect(deleteAccount("bad-token")).rejects.toBe(err);
      expect(apiFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getProfile", () => {
    it("Calls API fetch", async () => {
      const val = await getProfile("token-abc");
      expect(apiFetch).toHaveBeenCalled();
    });
  });
});
