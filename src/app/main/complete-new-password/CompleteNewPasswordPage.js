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

function CompleteNewPasswordPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const newPassword = useSelector(({ auth }) => auth.newPassword);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (
      newPassword.error &&
      ( newPassword.error.email ||
        newPassword.error.newPassword ||
        newPassword.error.newPasswordConfirm ||
        newPassword.error.phone)
    ) {
      formRef.current.updateInputsWithError({
        ...newPassword.error
      });
      disableButton();
    }
  }, [newPassword.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.completeNewPassword(model));
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
                UPDATE AN ACCOUNT
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
                  name="email"
                  label="Email"
                  validations="isEmail"
                  validationErrors={{
                    isEmail: "Please enter a valid email"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          email
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
                  name="newPassword"
                  label="Password"
                  validations="equalsField:newPasswordConfirm"
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
                  name="newPasswordConfirm"
                  label="Confirm Password"
                  validations="equalsField:newPassword"
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
                  type="text"
                  name="phone_number"
                  label="Phone"
                  value="+610424949901"
                  validations={{
                    minLength: 4
                  }}
                  validationErrors={{
                    minLength: "Min character length is 4"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          phone_iphone
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
                  aria-label="REGISTER"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  Register
                </Button>
              </Formsy>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Already have an account?</span>
                <Link className="font-medium" to="/login">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </OwnInAnimate>
      </div>
    </div>
  );
}

export default CompleteNewPasswordPage;
