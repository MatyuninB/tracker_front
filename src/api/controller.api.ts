import { Time } from "./endpoints/Time.endpoint";
import { User } from "./endpoints/User.endoint";

const backendUrl = import.meta.env.SNOWPACK_PUBLIC_BACKEND_ORIGIN || "";
console.log(backendUrl,'url')
class ApiGateway {
  user: User;
  time: Time;
  constructor() {
    this.user = new User({ baseUrl: backendUrl});
    this.time = new Time({ baseUrl: backendUrl})
  }
}

export const api = new ApiGateway(); 