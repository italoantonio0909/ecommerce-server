const TYPES = {
  SubscribersRepository: Symbol('SubscribersRepository'),
  SubscriberAdapter: Symbol('SubscriberAdapter'),
  Subscribers: Symbol('Subscribers'),
  SubscriberUserInterface: Symbol('SubscriberUserInterface'),
  SubscriberApiClient: Symbol('SubscriberApiClient'),

  Customer: Symbol('Customer'),
  CustomerRepository: Symbol('CustomerRepository'),
  CustomerUserInterface: Symbol('CustomerUserInterface'),

  Authentication: Symbol('Authentication'),
  AuthenticationAdapter: Symbol('AuthenticationAdapter'),
  AuthenticationUserInterface: Symbol('AuthenticationUserInterface'),
  AuthenticationApiClient: Symbol('AuthenticationApiClient'),

  Post: Symbol('Post'),
  PostWebApiClient: Symbol('PostWebApiClient'),
  PostUserInterface: Symbol('PostUserInterface'),
}

export default TYPES
