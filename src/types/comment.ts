export type Comment = {
    id: string,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
    createAt: string,
    guitarId: number,
};


export type CouponPost = {
  coupon: string,
}

export type OrderPost = {
  guitarsId: [],
  coupon: string,
};

export type CommentPost = Omit<Comment, 'createAt' | 'id'>
