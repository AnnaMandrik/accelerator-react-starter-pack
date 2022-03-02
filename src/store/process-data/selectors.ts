import {State} from '../../types/state';
import { NameDataList } from '../root-reducer';


const getIsReviewFormOpened = (state: State) => state[NameDataList.ProcessData].isReviewFormOpened;
const getIsSuccessReviewOpened = (state: State) => state[NameDataList.ProcessData].isSuccessReviewOpened;

export {getIsReviewFormOpened, getIsSuccessReviewOpened};
