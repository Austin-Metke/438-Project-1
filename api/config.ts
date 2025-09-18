declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_STOCKDATA_API: string;
      EXPO_PUBLIC_AUTH_API: string;
    }
  }
}

export const config = {
  stockDataApi: process.env.EXPO_PUBLIC_STOCKDATA_API || "",
  authApi: process.env.EXPO_PUBLIC_AUTH_API || "",
} as const;
