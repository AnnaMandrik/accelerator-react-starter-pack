const ITEMS_PER_PAGE = 9;

enum AppRoute {
  Main = '/',
  Guitars = '/guitars/',
}

enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

export {AppRoute, APIRoute, ITEMS_PER_PAGE};

