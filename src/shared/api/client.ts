import type { ApiResponse } from '@/shared/types';

class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });
      const json = await res.json();
      if (!res.ok) return { data: null, error: json.error || 'Request failed' };
      return { data: json.data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }

  async get<T>(url: string) { return this.request<T>(url); }
  async post<T>(url: string, body?: unknown) {
    return this.request<T>(url, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
  }
  async patch<T>(url: string, body?: unknown) {
    return this.request<T>(url, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined });
  }
  async delete<T>(url: string) { return this.request<T>(url, { method: 'DELETE' }); }
}

export const apiClient = new ApiClient();
