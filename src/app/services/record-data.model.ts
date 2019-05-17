export interface RecordData {
  userId: string;
  date: string;
  excercise: [{
    excerciseId: string,
    s: number,
    n: number,
    weight: number
  }];
  note: string;
  comment: string;
  done: boolean;
  quality: number;
}
