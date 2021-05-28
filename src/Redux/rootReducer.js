import { combineReducers } from 'redux';
import UserReducer from './user';
import CategoryReducer from './category';
import ProductReducer from './products';
import MessageReducer from './inbox';
export default combineReducers({
    userstore: UserReducer ,
    productstore: ProductReducer,
    categoryStore:CategoryReducer,
    messageStore:MessageReducer
});