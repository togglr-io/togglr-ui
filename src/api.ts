import dayjs from "dayjs";
import type { Toggle, SaveToggleReq, ListTogglesReq, ID } from "src/toggle";

// TODO (etate): Remove this hardcoded account ID once user tokens exist
const accountId = "8dc8c3cd-7c2a-4a4c-bc1e-7ba042096029";

enum Method {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export interface ToggleApi {
  saveToggle(toggle: SaveToggleReq): Promise<ID>;
  fetchToggle(id: string): Promise<Toggle>;
  listToggles(req: ListTogglesReq): Promise<Toggle[]>;
  deleteToggle(id: string): Promise<void>;
  fetchMetadata(): Promise<string[]>;
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
    saveToggle: async (toggle: SaveToggleReq): Promise<ID> => {
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

    fetchMetadata: async (): Promise<string[]> => {
      const url = `${cfg.baseUrl}/metadata/${accountId}`;
      return makeRequest(Method.GET, url);
    },
  };
}
