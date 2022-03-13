import {State} from '../../types/state';
import { NameDataList } from '../root-reducer';


const getIsReviewFormOpened = (state: State) => state[NameDataList.ProcessData].isReviewFormOpened;
const getIsSuccessReviewOpened = (state: State) => state[NameDataList.ProcessData].isSuccessReviewOpened;
const getIsAddOpened = (state: State) => state[NameDataList.ProcessData].isAddOpened;
const getIsDeleteOpened = (state: State) => state[NameDataList.ProcessData].isDeleteOpened;
const getIsSuccessCartOpened = (state: State) => state[NameDataList.ProcessData].isSuccessCartOpened;


export {getIsReviewFormOpened, getIsSuccessReviewOpened, getIsAddOpened, getIsDeleteOpened, getIsSuccessCartOpened};
