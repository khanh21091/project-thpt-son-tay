import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

/**
 * Base URL cho API backend.
 * - Trình duyệt: dùng NEXT_PUBLIC_API_URL (bắt buộc prefix này để bundle client nhận được).
 * - Server (Route Handler, Server Actions): có thể dùng API_URL nếu không muốn lộ URL ra client.
 */
function resolveBaseURL(): string | undefined {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const serverUrl = process.env.API_URL?.trim();
  if (typeof window !== "undefined") {
    return publicUrl || undefined;
  }
  return serverUrl || publicUrl || undefined;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 30_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Bật true nếu backend dùng cookie session (CORS phải cấu hình phù hợp)
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Gắn token / header tùy chỉnh tại đây khi có auth
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/** Lấy message lỗi thân thiện cho UI (form, toast). */
export function getApiErrorMessage(error: unknown, fallback = "Đã có lỗi xảy ra. Vui lòng thử lại."): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    const msg = data?.message ?? data?.error ?? error.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
