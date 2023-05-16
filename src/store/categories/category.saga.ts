import {takeLatest, all, call, put} from 'typed-redux-saga';
import { getCategoriesandDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';


// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesandDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error){
//         dispatch(fetchCategoriesFailed(error));
//     }
// }

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesandDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error){
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])
}