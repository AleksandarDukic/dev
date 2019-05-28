import { ExcercisesData } from './excercises-data.model';
import { VidData } from './vid-data.model';
export interface RecordData {
  userId: string;
  date: string;
  excercises: VidData [];
  note: string;
  comment: string;
  done: boolean;
  quality: number;
}

/*
export interface RecordData {
  userId: string;
  date: string;
  excercises: [{
    name: string,
    link: string,
    note: string,
    type: string,
    //s: number,
    //n: number,
    //weight: number
  }];
  note: string;
  comment: string;
  done: boolean;
  quality: number;
}
*/
