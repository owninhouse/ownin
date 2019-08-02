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
import { OwnInAnimate, TextFieldFormsy, CheckboxFormsy } from "@ownin";
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

function RegisterPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const register = useSelector(({ auth }) => auth.register);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (
      register.error &&
      (register.error.username ||
        register.error.email ||
        register.error.password ||
        register.error.passwordConfirm ||
        register.error.phone)
    ) {
      formRef.current.updateInputsWithError({
        ...register.error
      });
      disableButton();
    }
  }, [register.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitRegisterCognito(model));
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
                CREATE AN ACCOUNT
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
                  value="lucas"
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
                  name="password"
                  label="Password"
                  validations="equalsField:passwordConfirm"
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
                  name="passwordConfirm"
                  label="Confirm Password"
                  validations="equalsField:password"
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

                <CheckboxFormsy
                    className="my-16"
                    name="acceptTermsConditions"
                    value={false}
                    label="I read and accept terms and conditions"
                    validations="equals:true"
                    validationError="You need to accept"
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

export default RegisterPage;
