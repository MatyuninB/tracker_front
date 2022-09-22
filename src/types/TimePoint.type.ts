export type TimeState = 'start' | 'stop';

export interface TimePoint {
  type: 'main' | 'sub';
  state: TimeState;
  time: Date;
  description?: string;
  title?: string;
  estimate?: string;
  projectId?: number;
}