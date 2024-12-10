import { TUser } from './user.type';
import { TVocabulary } from './vocabulary.type';

export interface TLesson {
  _id: string;
  name: string;
  number: number;
  createdBy: TUser;
  vocabularies: TVocabulary[];
  createdAt: string;
  updatedAt: string;
}
