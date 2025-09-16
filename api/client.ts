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
  const controller = new AbortController();
  const id = timeout(timeoutMs, controller);
  try {
    const res = await fetch(`${URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",          // <—
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      redirect: "follow",
      signal: controller.signal,
    });

    const ct = res.headers.get("content-type") || "";
    const raw = await res.text();
    const isJson = ct.includes("application/json");
    let data: unknown = null;

    if (isJson && raw) {
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.log("JSON parse failed. CT:", ct, "Status:", res.status, "Body head:", raw.slice(0, 200));
        throw new Error("Server returned invalid JSON.");
      }
    }

    if (!res.ok) {
      const msg =
        (isJson && (data as any)?.error) ||
        (isJson && (data as any)?.message) ||
        `HTTP ${res.status} ${res.statusText} — ${raw.slice(0, 200)}`;
      throw new Error(msg);
    }

    if (!isJson) {
      // This is what causes the "<" error — surface it clearly
      console.log("Non-JSON response", { status: res.status, ct, bodyStart: raw.slice(0, 200) });
      throw new Error(`Expected JSON but got "${ct || "unknown"}": ${raw.slice(0, 200)}`);
    }

    return data as T;
  } finally {
    clearTimeout(id);
  }
}
