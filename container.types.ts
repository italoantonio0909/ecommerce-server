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

  CustomerCreate: Symbol('CustomerCreate'),
  CustomerPaginate: Symbol('CustomerPaginate'),
  CustomerFind: Symbol('CustomerFind'),
  CustomerDelete: Symbol('CustomerDelete'),
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

  ProductCreate: Symbol('ProductCreate'),
  ProductPaginate: Symbol('ProductPaginate'),
  ProductDetail: Symbol('ProductDetail'),
  ProductUpdate: Symbol('ProductUpdate'),
  ProductAdapter: Symbol('ProductAdapter'),
  ProductUserInterface: Symbol('ProductUserInterface'),
  ProductApiClient: Symbol('ProductApiClient'),

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
