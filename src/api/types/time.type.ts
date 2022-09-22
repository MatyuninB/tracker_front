export interface TotalTime {
  id: number;
  time?: (TimeEntity)[] | null;
  createdAt: string;
  user: User;
  calculatedTime: CalculatedTime;
  status: boolean;
}
export interface TimeEntity {
  time: string;
  type: string;
  state: string;
  title: string;
}
export interface User {
  id: number;
  name: string;
  lastName: string;
  role: string;
  email: string;
  avatar: string;
  createdAt: string;
}
export interface CalculatedTime {
  total: number;
  timers?: (TimersEntity)[] | null;
}
export interface TimersEntity {
  title: string;
  time: number;
}
