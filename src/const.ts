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

enum Params {
  Sort = 'sort',
  Order = 'order',
}

enum SortKey {
  Price = 'price',
  Rating = 'rating',
}

enum OrderKey {
  Desc = 'desc',
  Asc = 'asc',
}

export {AppRoute, APIRoute, ITEMS_PER_PAGE, Params, SortKey, OrderKey};

