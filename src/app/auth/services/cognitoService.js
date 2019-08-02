import { Auth } from 'aws-amplify'
import { AWS_COGNITO_CONFIG } from './cognitoServiceConfig';

class cognitoService {

  init = () => Auth.configure(AWS_COGNITO_CONFIG);

  isAuthenticated = () => Auth.currentAuthenticatedUser()
    .then(() => true)
    .catch(() => false);

  getUserData = () => Auth.currentUserInfo();

  signUp = (username, password, email, phone_number) => Auth.signUp({ username, password, attributes: { email, phone_number } });

  confirmSignUp = (username, code) => Auth.confirmSignUp(username, code)

  signIn = async (username, password) => Auth.signIn(username, password);

  confirmSignIn = async (user, code, mfaType) => Auth.confirmSignIn(user, code, mfaType);

  signOut = async () => await Auth.signOut();

  forgotPassword = (username) => Auth.forgotPassword(username);

  forgotPasswordSubmit = (username, code, password) => Auth.forgotPasswordSubmit(username, code, password);

  changePassword = (user, oldPassword, newPassword) => Auth.changePassword(user, oldPassword, newPassword);

  resendCode = (username) => Auth.resendSignUp(username);

  completeNewPassword = (user, newPassword, email, phone_number) => Auth.completeNewPassword(user, newPassword, { email, phone_number })

}

const instance = new cognitoService();

export default instance;