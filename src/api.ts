import dayjs from "dayjs";
import type { Toggle, ListTogglesReq, ID } from "./toggle";

enum Method {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export interface ToggleApi {
  createToggle(toggle: Toggle): Promise<ID>;
  fetchToggle(id: string): Promise<Toggle>;
  listToggles(req: ListTogglesReq): Promise<Toggle[]>;
  deleteToggle(id: string): Promise<void>;
}

export interface ApiConfig {
  baseUrl: string;
}

interface reqOpts {
  body?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
}

// generic request builder with return type inference
async function makeRequest<T>(
  method: Method,
  url: string,
  opts?: reqOpts
): Promise<T> {
  const res = await fetch(url, {
    method,
    body: opts?.body,
  });

  const json = await res.json();
  return json as T;
}

export function getToggleApi(cfg: ApiConfig): ToggleApi {
  return {
    createToggle: async (toggle: Toggle): Promise<ID> => {
      const url = `${cfg.baseUrl}/toggle`;
      return makeRequest(Method.POST, url, { body: JSON.stringify(toggle) });
    },

    fetchToggle: async (id: string): Promise<Toggle> => {
      const url = `${cfg.baseUrl}/toggle/${id}`;
      const toggle: Toggle = await makeRequest(Method.GET, url);
      // need to convert the timestamps before returning
      toggle.createdAt = dayjs(toggle.createdAt);
      toggle.updatedAt = dayjs(toggle.createdAt);

      return toggle;
    },

    listToggles: async (req: ListTogglesReq): Promise<Toggle[]> => {
      const url = `${cfg.baseUrl}/toggle`;
      const toggles: Toggle[] = await makeRequest(Method.GET, url);

      // need to convert the timestamps before returning
      return toggles.map((toggle) => ({
        ...toggle,
        createdAt: dayjs(toggle.createdAt),
        updatedAt: dayjs(toggle.updatedAt),
      }));
    },

    deleteToggle: async (id: string): Promise<void> => {
      const url = `${cfg.baseUrl}/toggle/${id}`;
      return makeRequest(Method.DELETE, url);
    },
  };
}
