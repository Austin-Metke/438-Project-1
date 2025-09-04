declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_STOCKDATA_API: string;
    }
  }
}

export const config = {
  stockDataApi: process.env.EXPO_PUBLIC_STOCKDATA_API || "",
} as const;