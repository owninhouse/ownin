import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  Icon
} from "@material-ui/core";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { OwnInAnimate, TextFieldFormsy } from "@ownin";
import Formsy from "formsy-react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as actions from "./store/actions";

const useStyles = makeStyles(theme => ({
    root   : {
        background: lighten(theme.palette.primary.light, 1)
        // background: 'radial-gradient(' + lighten(theme.palette.primary.light, 1) + ' 0%, ' + lighten(theme.palette.primary.light, .9) + ' 80%)'
    },
    divider: {
        backgroundColor: theme.palette.divider
    }
}));

const Qualify = ( props ) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const register = useSelector(({ qualify }) => qualify);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (
      register.error &&
      (register.error.firstname ||
        register.error.lastname ||
        register.error.email ||
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
    console.log(model)
    dispatch(actions.registerQualify(model));
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
                  name="firstname"
                  label="First Name"
                  value=""
                  validations={{
                    minLength: 2
                  }}
                  validationErrors={{
                    minLength: "Min character length is 2"
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
                  name="lastname"
                  label="Last Name"
                  value=""
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
                  type="text"
                  name="phone"
                  label="Phone"
                  value="+610424949901"
                  validations={{
                    minLength: 12
                  }}
                  validationErrors={{
                    minLength: "Min character length is 12"
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
                  className="ml-auto mt-16 normal-case"
                  aria-label="Verify"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  Qualify
                </Button>
              </Formsy>
            </CardContent>
          </Card>
        </OwnInAnimate>
      </div>
    </div>
    )
    
}

export default withReducer('qualify', reducer)(Qualify);
// export default Qualify;