const TYPES = {
  SubscribersRepository: Symbol('SubscribersRepository'),
  SubscriberAdapter: Symbol('SubscriberAdapter'),
  SubscriberCreate: Symbol('SubscriberCreate'),
  SubscriberSearch: Symbol('SubscriberSearch'),
  SubscriberDelete: Symbol('SubscriberDelete'),
  SubscriberPaginate: Symbol('SubscriberPaginate'),
  SubscriberUpdate: Symbol('SubscriberUpdate'),
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

  Blog: Symbol('Post'),
  BlogWebApiClient: Symbol('PostWebApiClient'),
  BlogUserInterface: Symbol('PostUserInterface'),
  BlogAdapter: Symbol('BlogAdapter'),

  CatalogueCategory: Symbol('CatalogueCategory'),
  CatalogueCategoryAdapter: Symbol('CatalogueCategoryAdapter'),
  CatalogueCategoryUserInterface: Symbol('CatalogueCategoryUserInterface'),
  CatalogueCategoryApiClient: Symbol('CatalogueCategoryApiClient'),

  CatalogueProduct: Symbol('CatalogueProduct'),
  CatalogueProductAdapter: Symbol('CatalogueProductAdapter'),
  CatalogueProductUserInterface: Symbol('CatalogueProductUserInterface'),
  CatalogueProductApiClient: Symbol('CatalogueProductApiClient'),

  CatalogueProductClass: Symbol('CatalogueProductClass'),
  CatalogueProductClassAdapter: Symbol('CatalogueProductClassAdapter'),
  CatalogueProductClassUserInterface: Symbol('CatalogueProductClassUserInterface'),
  CatalogueProductClassApiClient: Symbol('CatalogueProductClassApiClient'),

  Basket: Symbol('Basket'),
  BasketAdapter: Symbol('BasketAdapter'),
  BasketUserInterface: Symbol('BasketUserInterface'),
  BasketApiClient: Symbol('BasketApiClient'),

  Partner: Symbol('Partner'),
  PartnerAdapter: Symbol('PartnerAdapter'),
  PartnerUserInterface: Symbol('PartnerUserInterface'),
  PartnerApiClient: Symbol('PartnerApiClient')
}

export default TYPES
