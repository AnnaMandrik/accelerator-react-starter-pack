import {Guitar} from './types/guitar';
import {name, image, datatype, lorem, date, random, commerce} from 'faker';
import {Comment} from './types/comment';
import { MainData, UserData } from './types/state';

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


export const MockUserData: UserData = {
  sort: {
    sorting: '',
    order: '',
  },
  filter: {
    types: [],
    strings: [],
    minPrice: '',
    maxPrice: '',
  },
  searching: fakeProducts,
};

export const MockMainData: MainData = {
  productsList: [],
  maxDefaultPrice: 0,
  minDefaultPrice: 0,
  pagesCount: 0,
  isDataLoaded: true,
  currentComments: [],
  currentProduct: {} as Guitar,
  commentsCounter: 3,
};

export const TestReg = {
  BackToRoot: new RegExp('Перейти главную страницу', 'i'),
  NotFoundPage: new RegExp('404. Этой страницы не существует', 'i'),
  Root: new RegExp('root', 'i'),
  StubPage: new RegExp('Эта страница находится в разработке', 'i'),
  BreadcrumbsMain: new RegExp('Главная', 'i'),
  BreadcrumbsCatalog: new RegExp('Каталог', 'i'),
  Logo: new RegExp('Логотип', 'i'),
  FooterAbout: new RegExp('О нас', 'i'),
  Where: new RegExp('Где купить?', 'i'),
  About: new RegExp('О компании', 'i'),
  FooterBlog: new RegExp('Блог', 'i'),
  FooterQuestion: new RegExp('Вопрос - ответ', 'i'),
  FooterBack: new RegExp('Возврат', 'i'),
  FooterService: new RegExp('Сервис-центр', 'i'),
  FooterConstacts: new RegExp('Контакты', 'i'),
  FooterWork: new RegExp('Режим работы:', 'i'),
  SearchPlaceholder: new RegExp('что вы ищите?', 'i'),
  SearchLabel: new RegExp('Поиск', 'i'),
  CartLabel: new RegExp('Корзина', 'i'),
  Catalog: new RegExp('Каталог', 'i'),
  Main: new RegExp('Main', 'i'),
  AboutProduct: new RegExp('Подробнее', 'i'),
  NextPage: new RegExp('Далее', 'i'),
  PrevPage: new RegExp('Назад', 'i'),
  ByPrice: new RegExp('по цене', 'i'),
  ByRating: new RegExp('по популярности', 'i'),
  Ascending: new RegExp('По возрастанию', 'i'),
  Descending: new RegExp('По убыванию', 'i'),
  PriceTitle: new RegExp('Цена, ₽', 'i'),
  TypeTitle: new RegExp('Тип гитар', 'i'),
  StringTitle: new RegExp('Количество струн', 'i'),
  Electric: new RegExp('Электрогитары', 'i'),
  Acoustic: new RegExp('Акустические гитары', 'i'),
  Ukulele: new RegExp('Укулеле', 'i'),
  StringFour: new RegExp('4', 'i'),
  StringSix: new RegExp('6', 'i'),
  StringSeven: new RegExp('7', 'i'),
  StringTwelve: new RegExp('12', 'i'),
  FilterTitle: new RegExp('Фильтр', 'i'),
  Preloader: new RegExp('Loading', 'i'),
  NoProduct: new RegExp('Нет гитар с заданными параметрами', 'i'),
  LeaveReviewBtn: new RegExp('Оставить отзыв', 'i'),
  ShowMoreBtn: new RegExp('Показать еще отзывы', 'i'),
  ScrollBtn: new RegExp('Наверх', 'i'),
  AddCartBtn: new RegExp('Добавить в корзину', 'i'),
  Price: new RegExp('Цена', 'i'),
  Rating: new RegExp('Рейтинг', 'i'),
  Characteristics: new RegExp('Характеристики', 'i'),
  Description: new RegExp('Описание', 'i'),
  Reviews: new RegExp('Отзывы', 'i'),
  NoReviews: new RegExp('Отзывов ещё нет', 'i'),
  Comment: new RegExp('Комментарий', 'i'),
  SuccessBtn: new RegExp('К покупкам!', 'i'),
  SubmitBtn: new RegExp('Отправить отзыв', 'i'),
  ValidErrorText: new RegExp('Заполните поле', 'i'),
  ValidErrorStar: new RegExp('Поставьте оценку', 'i'),
};

export const Stub= `${TestReg.StubPage}`;
export const Main =`${TestReg.Main}`;
