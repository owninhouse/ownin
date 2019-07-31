import {combineReducers} from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import forgotPassword from './forgot-password.reducer';
import newPassword from './new-password.reducer';

const authReducers = combineReducers({
    user,
    login,
    register,
    forgotPassword,
    newPassword
});

export default authReducers;