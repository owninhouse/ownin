import {combineReducers} from 'redux';
import ownin from './ownin';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/ownin-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        ownin,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
