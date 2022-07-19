import { Paginate } from '../../../shared/pagination/domain/Paginate';
import { BackofficeSubscriber } from './BackofficeSubscriber';

export interface BackofficeSubscribersRepository {
  paginate(limitOfDocuments: number, page: number): Promise<Paginate<BackofficeSubscriber>>;

  create(subscriber: BackofficeSubscriber): Promise<BackofficeSubscriber>;

  update(uid: string, subscriber: Partial<BackofficeSubscriber>): Promise<BackofficeSubscriber>;

  delete(uid: string): Promise<BackofficeSubscriber>;

  searchByEmail(email: string): Promise<BackofficeSubscriber>;

  total(): Promise<{ subscribersTotal: number }>;
}
