import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, InputAdornment, Icon } from "@material-ui/core";
// import { makeStyles } from '@material-ui/styles';
import { OwnInAnimate, TextFieldFormsy } from "@ownin";
import Formsy from "formsy-react";

import { useDispatch, useSelector } from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as actions from "./store/actions";

// const useStyles = makeStyles(theme => ({
// }));

const Footer = (props) => {
  // const classes = useStyles();

  const dispatch = useDispatch();
  const contact = useSelector(({ footer }) => footer.contact);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (
      contact.error &&
      (contact.error.firstname ||
        contact.error.lastname ||
        contact.error.email ||
        contact.error.phone)
    ) {
      formRef.current.updateInputsWithError({
        ...contact.error
      });
      disableButton();
    }
  }, [contact.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(actions.contact(model));
  }

  return (
    <div className={`flex flex-col items-center w-full h-full ${props.container ? 'container' : ''} p-0 lg:px-24`}>
      <OwnInAnimate animation="transition.slideUpIn" duration={400} delay={100}>
        <Typography className="text-36 sm:text-56 font-light">
          Get in touch
        </Typography>
      </OwnInAnimate>
      <OwnInAnimate duration={400} delay={600}>
        <Typography variant="subtitle1" className="mt-8 sm:mt-16 max-w-512" align="center">
          There are many variations of passages of Lorem Ipsum available, but the majorityhave suffered alteration in some form, by injected humour,available
        </Typography>
      </OwnInAnimate>
      <div className="md:flex max-w-2xl flex-auto">
        <div className="flex">
          <Typography className="text-26 sm:text-36 font-light mt-8 sm:mt-16 max-w-512">
            Say Hello!
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
              name="name"
              label="Name"
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
              type="email"
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
              name="message"
              label="Message"
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="ml-auto mt-16 normal-case"
              aria-label="Verify"
              disabled={!isFormValid}
              value="submit"
            >
              Submit
                </Button>
          </Formsy>
        </div>
        <div className="flex">
          <Typography className="text-26 sm:text-36 font-light mt-8 sm:mt-16 max-w-512">
            Contact Us
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default withReducer('footer', reducer)(Footer);
