import type { BaseContructor } from "../types/base";
import { EndpointBase } from "./abstract/Base.endoint";

export class User extends EndpointBase {
  constructor({ baseUrl }: BaseContructor) {
    super({ baseUrl });
    this.onInit();
  }

  public async login() {
    window.open(this.buildUrl({ endpoint: "auth/google" }), "_self");
  }

  public async me() {
    return this.request({ method: "GET", endpoint: "user/me" });
  }

  private onInit() {
    if (window.location.search.includes("token")) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        document.cookie = `jwt=${token}`;
        urlParams.delete("token");
        window.open(
          new URL("?" + urlParams.toString(), window.location.origin),
          "_self"
        );
      }
    }
  }
}
