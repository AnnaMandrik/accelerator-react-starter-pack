export type Comment = {
    id: string,
    userName: string,
    advantages: string,
    disadvantages: string,
    comment: string,
    rating: number,
    createAt: string,
    guitarId: number,
};

export type CommentPost = {
  guitarId: number,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
};

export type CouponPost = {
  coupon: string,
}

export type OrderPost = {
  guitarsId: [],
  coupon: string,
};
