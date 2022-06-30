const TYPES = {
  SubscribersRepository: Symbol('SubscribersRepository'),
  SubscriberAdapter: Symbol('SubscriberAdapter'),
  Subscribers: Symbol('Subscribers'),
  SubscriberUserInterface: Symbol('SubscriberUserInterface'),
  SubscriberApiClient: Symbol('SubscriberApiClient'),

  Customer: Symbol('Customer'),
  CustomerAdapter: Symbol('CustomerAdapter'),
  CustomerApiClient: Symbol('CustomerApiClient'),
  CustomerUserInterface: Symbol('CustomerUserInterface'),

  Authentication: Symbol('Authentication'),
  AuthenticationAdapter: Symbol('AuthenticationAdapter'),
  AuthenticationUserInterface: Symbol('AuthenticationUserInterface'),
  AuthenticationApiClient: Symbol('AuthenticationApiClient'),

  Post: Symbol('Post'),
  PostWebApiClient: Symbol('PostWebApiClient'),
  PostUserInterface: Symbol('PostUserInterface'),

  CatalogueCategory: Symbol('CatalogueCategory'),
  CatalogueCategoryAdapter: Symbol('CatalogueCategoryAdapter'),
  CatalogueCategoryUserInterface: Symbol('CatalogueCategoryUserInterface'),
  CatalogueCategoryApiClient: Symbol('CatalogueCategoryApiClient'),


  CatalogueProduct: Symbol('CatalogueProduct'),
  CatalogueProductAdapter: Symbol('CatalogueProductAdapter'),
  CatalogueProductUserInterface: Symbol('CatalogueProductUserInterface'),
  CatalogueProductApiClient: Symbol('CatalogueProductApiClient'),
}

export default TYPES
