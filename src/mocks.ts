import {Guitar, Guitars} from './types/guitar';
import {image, music, name} from 'faker';

enum Count {
  GuitarsTest = 5,
  CommentsTest = 15,
}

export enum HttpCode {
  Ok = 200,
  NoContent = 204,
  NoAuth = 401,
}

const makeFakeGuitar = (): Guitar => ({
  'id': 1,
  'name': name.firstName(),
  'vendorCode': 'SO7568698',
  'type': music.genre(),
  'description': 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  'previewImg': image.image(),
  'stringCount': 12,
  'rating': 5,
  'price': 1500,
} as Guitar);

export const makeFakeGuitars = (): Guitars => new Array(Count.GuitarsTest).fill(undefined).map(() => makeFakeGuitar());
