import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types'
import { SubscriberUserInterface } from '../ui/SubscribersUserInterface'
import { SubscriberCreate } from '../../application/create/SubscriberCreate';
import { Subscriber } from '../../domain/Subscriber';

@injectable()
export class SubscriberAdapter implements SubscriberUserInterface {
  constructor(
    // @inject(TYPES.SubscriberUserInterface)
    // private subscribersUserInterface: SubscriberUserInterface,
    @inject(TYPES.SubscriberCreate) private subscriberCreate: SubscriberCreate,
  ) { }

  installSubscriberCreate(subscriber: Subscriber): Promise<Subscriber> {
    return this.subscriberCreate.create(subscriber);
  }
}
