import {Guitar} from './types/guitar';
import {name, image, datatype, lorem, date, random, commerce} from 'faker';
import {Comment} from './types/comment';

const STRINGS: number[] = [4, 6, 7, 12];
const TYPES: string[] = ['ukulele', 'acoustic', 'electric'];

const COMMENTS_LENGTH = 5;
const PRODUCTS_LENGTH = 10;

export enum HttpCode {
  Ok = 200,
  NoContent = 204,
  NoAuth = 401,
}

export const MakeFakeGuitar = (): Guitar => ({
  id: 1,
  name:  name.firstName(),
  vendorCode: lorem.word(),
  type: random.arrayElement(TYPES),
  description:  lorem.sentences(datatype.number(3)),
  previewImg: image.imageUrl(),
  stringCount: random.arrayElement(STRINGS),
  rating: datatype.float({ max: 5 }),
  price: Number(commerce.price()),
});

export const makeFakeGuitars = new Array(PRODUCTS_LENGTH)
  .fill(null)
  .map(MakeFakeGuitar);


export const MakeFakeComment = (): Comment => ({
  id: '1',
  userName: name.firstName(),
  advantage: lorem.word(),
  disadvantage: lorem.word(),
  comment: lorem.sentences(datatype.number(3)),
  rating: datatype.float({ max: 5 }),
  createAt: date.past().toString(),
  guitarId: 1,
});


export const fakeComments = new Array(COMMENTS_LENGTH)
  .fill(null)
  .map(MakeFakeComment);


export const fakeProducts = new Array(PRODUCTS_LENGTH)
  .fill(null)
  .map((element) => element = { ...MakeFakeGuitar(), comments: fakeComments });


export const fakeProduct = { ...MakeFakeGuitar(), comments: fakeComments };
