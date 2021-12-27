enum AppRoute {
  Main = '/',
}

enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

export {AppRoute, APIRoute};

