import { ExcercisesData } from './excercises-data.model';

export interface RecordData {
  userId: string;
  date: string;
  excercises: ExcercisesData[];
  note: string;
  comment: string;
  quality: number;
}

