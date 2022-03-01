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


export type CommentPost = Omit<Comment, 'createAt' | 'id'>
export type CommentData = Omit<CommentPost, 'guitarId'>
