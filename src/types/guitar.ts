import {Comment} from './comment';

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
};


export type Guitars = Guitar[];


export type StringType = {
  id: string;
  stringCount: string;
};


export type GuitarType = {
  id: string;
  title: string;
  type: string
};

export type Product = Guitar & {comments: Comment[]};

