import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  Typography,
  Icon
} from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { OwnInAnimate, TextFieldFormsy } from "@ownin";
import Formsy from "formsy-react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "app/auth/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    background:
      "radial-gradient(" +
      darken(theme.palette.primary.dark, 0.5) +
      " 0%, " +
      theme.palette.primary.dark +
      " 80%)",
    color: theme.palette.primary.contrastText
  }
}));

const ForgotPasswordSubmitPage = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const forgotPassword = useSelector(
    ({ auth }) => auth.forgotPassword
  );

  const [username, setUsername] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setUsername(match.params.username);
  }, [match])

  useEffect(() => {
    if (
      forgotPassword.error &&
      (forgotPassword.error.code ||
        forgotPassword.error.new_password ||
        forgotPassword.error.new_passwordConfirm)
    ) {
      formRef.current.updateInputsWithError({
        ...forgotPassword.error
      });
      disableButton();
    }
  }, [forgotPassword.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.forgotPasswordSubmit(model));
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <OwnInAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img
                className="w-128 m-32"
                src="assets/images/logos/ownin.svg"
                alt="logo"
              />

              <Typography variant="h6" className="mt-16 mb-32">
                RESET YOUR PASSWORD
              </Typography>

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
                  name="username"
                  label="Username"
                  disabled
                  value={username}
                  validations={{
                    minLength: 6
                  }}
                  validationErrors={{
                    minLength: "Min character length is 6"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          person
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />
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
                    minLength: "Min character length is 6"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          lock
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className="mb-16"
                  type="password"
                  name="new_password"
                  label="New Password"
                  validations="equalsField:new_passwordConfirm"
                  validationErrors={{
                    equalsField: "Passwords do not match"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className="mb-16"
                  type="password"
                  name="new_passwordConfirm"
                  label="New Confirm Password"
                  validations="equalsField:new_password"
                  validationErrors={{
                    equalsField: "Passwords do not match"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 normal-case"
                  aria-label="CONFIRM RESET PASSWORD"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  Confirm Reset Password
                </Button>
              </Formsy>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-medium" to="/login">
                  Go back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </OwnInAnimate>
      </div>
    </div>
  );
}

export default ForgotPasswordSubmitPage;
