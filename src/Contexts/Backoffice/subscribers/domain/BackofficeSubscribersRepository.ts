import { BackofficeSubscriber } from './BackofficeSubscriber';
import { Paginate } from '../../../Shared/pagination/domain/Paginate';

export interface BackofficeSubscribersRepository {
  paginate(limitOfDocuments: number, page: number): Promise<Paginate<BackofficeSubscriber>>;

  create(subscriber: BackofficeSubscriber): Promise<BackofficeSubscriber>;

  update(uid: string, subscriber: Partial<BackofficeSubscriber>): Promise<BackofficeSubscriber>;

  delete(uid: string): Promise<BackofficeSubscriber>;

  searchByEmail(email: string): Promise<BackofficeSubscriber>;

  total(): Promise<{ subscribersTotal: number }>;
}
