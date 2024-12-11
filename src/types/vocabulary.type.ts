import { TLesson } from './lesson.type';

export interface TVocabulary {
  _id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lesson: TLesson;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
