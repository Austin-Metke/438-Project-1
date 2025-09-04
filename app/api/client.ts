const URL = "https://node.austin-metke.com/api/";
const TIMEOUT = 10000;

function timeout(ms: number, controller: AbortController) {
  return setTimeout(() => controller.abort(), ms);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  timeoutMs = TIMEOUT
): Promise<T> {
  //To prevent hanging incase of network issues, we use a timeout
  const controller = new AbortController();
  const id = timeout(timeoutMs, controller);
  try {

    // `path` being the endpoint we want from our server
    const res = await fetch(`${URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    //Error handling
    if (!res.ok) {
      const message = data?.error || data?.message || `HTTP ${res.status}`;
      throw new Error(message);
    }
    return data as T;
  } finally {
    //cancel timeout
    clearTimeout(id);
  }
}
