import React, { Component } from 'react';
import { OwnInSplashScreen } from '@ownin';
import { connect } from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import cognitoService from 'app/auth/services';

class Auth extends Component {

    state = {
        waitAuthCheck: true
    }

    componentDidMount() {
        return Promise.all([
            this.cognitoCheck()
        ]).then(() => {
            this.setState({ waitAuthCheck: false })
        })
    }

    cognitoCheck = () => new Promise(resolve => {
        cognitoService.init(
            success => {
                if (!success) resolve();
            }
        );

        if (cognitoService.isAuthenticated()) {

            cognitoService.getUserData()
                .then((info) => {
                    this.props.setUserDataCognito(info);
                    this.props.showMessage({ message: 'Logged in with Cognito' });
                    resolve();
                })
                .catch(() => {
                    resolve();
                })
        }
        else resolve();
    })

    render() {
        return this.state.waitAuthCheck ? <OwnInSplashScreen /> : <React.Fragment children={this.props.children} />;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: userActions.logoutUser,
        setUserData: userActions.setUserData,
        setUserDataCognito: userActions.setUserDataCognito,
        showMessage: Actions.showMessage,
        hideMessage: Actions.hideMessage
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
