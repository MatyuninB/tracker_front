import type { BaseContructor } from "src/api/types/base";

interface RequestParams {
  method?: string;
  body?: BodyInit | null;
  headers?: HeadersInit;
  endpoint?: string;
  query?: { [key: string]: string };
}

export class EndpointBase {
  protected baseUrl: string;
  constructor({ baseUrl }: BaseContructor) {
    this.baseUrl = baseUrl;
  }

  protected request({ method, body, query, endpoint, headers }: RequestParams) {
    return fetch(this.buildUrl({ endpoint, query }), {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers
      },
      body,
      credentials: "include",
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error((await res.json()).message);
      }
      return res.json()
    });
  }

  protected buildUrl({
    endpoint = "",
    query,
  }: Partial<RequestParams>): string | URL {
    const queryString = new URLSearchParams(query).toString();

    return queryString
      ? new URL(endpoint, this.baseUrl).href + `?${queryString}`
      : new URL(endpoint, this.baseUrl).href;
  }
}
