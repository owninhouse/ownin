import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, CardContent, Divider, InputAdornment, Typography, Icon} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import {OwnInAnimate, TextFieldFormsy} from '@ownin';
import Formsy from 'formsy-react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from 'app/auth/store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
}));

const ConfirmLoginPage = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( login.error && (login.error.code) )
        {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        dispatch(authActions.submitConfirmLoginWithCognito(model));
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <OwnInAnimate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32">

                            <img className="w-128 m-32" src="assets/images/logos/ownin.svg" alt="logo"/>

                            <Typography variant="h6" className="mt-16 mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                            <Formsy
                                onValidSubmit={handleSubmit}
                                onValid={enableButton}
                                onInvalid={disableButton}
                                ref={formRef}
                                className="flex flex-col justify-center w-full"
                            >

                                <TextFieldFormsy
                                    className="mb-16"
                                    type="text"
                                    name="code"
                                    label="Code"
                                    value="000000"
                                    validations={{
                                        minLength: 6
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 6'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">lock</Icon></InputAdornment>
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <div className="flex items-center justify-between">
                                    <Link className="font-medium" to="/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16 normal-case"
                                    aria-label="LOG IN"
                                    disabled={!isFormValid}
                                    value="legacy"
                                >
                                    CONFIRM LOGIN
                                </Button>

                            </Formsy>

                            <div className="my-24 flex items-center justify-center">
                                <Divider className="w-32"/>
                                <span className="mx-8 font-bold">OR</span>
                                <Divider className="w-32"/>
                            </div>

                            <Button variant="contained" color="secondary" size="small"
                                    className="normal-case w-192 mb-8">
                                Log in with Google
                            </Button>

                            <Button variant="contained" color="primary" size="small"
                                    className="normal-case w-192">
                                Log in with Facebook
                            </Button>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <span className="font-medium">Don't have an account?</span>
                                <Link className="font-medium" to="/register">Create an account</Link>
                            </div>

                        </CardContent>
                    </Card>
                </OwnInAnimate>
            </div>
        </div>
    );
}

export default ConfirmLoginPage;
