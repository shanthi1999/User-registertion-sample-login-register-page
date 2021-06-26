import { useRef, useState, useEffect } from "react";
import "./ForgetPassword.scss";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";

export default function ForgetPassword() {
  const [data, setData] = useState({
    email: null,
  });

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const [validation, setvalidation] = useState({
    emailValidation: false,
    linkSent: false,
    inValidEmail: false,
  });

  const changeData = (e) => {
    var name = e.target.name;
    if (name == "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var validations = re.test(String(e.target.value).toLowerCase());
      console.log(validations);
      if (validations) {
        setData({
          ...data,
          [name]: e.target.value,
        });
        setvalidation({
          ...validation,
          emailValidation: true,
        });
      } else {
        setvalidation({
          ...validation,
          emailValidation: false,
        });
      }
    }
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const submitForm = async () => {
    if (data.email) {
      console.log("form submited", data);
      await axios
        .post("http://localhost:9000/api/userData/forgetpassword", data)
        .then((responses) => {
          console.log(responses)
          if (responses.data.status == true) {
            setvalidation({
              linkSent: true,
            });
          }
        })
        .catch((err) => {
          console.log("coming here............");
          setvalidation({ inValidEmail: true });
        });
    }
  };

  return (
    <div>
      <div className="App">
        <div className="innerDiv">
          {validation.linkSent ? (
            <div className="svgs">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
              >
                <circle
                  class="path circle"
                  fill="none"
                  stroke="#73AF55"
                  stroke-width="6"
                  stroke-miterlimit="10"
                  cx="65.1"
                  cy="65.1"
                  r="62.1"
                />
                <polyline
                  class="path check"
                  fill="none"
                  stroke="#73AF55"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  points="100.2,40.2 51.5,88.8 29.8,67.5 "
                />
              </svg>
              <p>Password reset Link sent to mail id {data.email}</p>
            </div>
          ) : (
            <div className="emailDiv">
              <p>
                Please enter the email-id which you have already registered.
              </p>
              <input
                type="email"
                name="email"
                ref={emailRef}
                onChange={(e) => changeData(e)}
                placeholder="Email"
                className="userName"
              />
              <p className="errormessage">
                {validation.emailValidation ? (
                  <br />
                ) : data.email !== null ? (
                  validation.inValidEmail ? (
                    "Email id not Exist"
                  ) : (
                    "please enter the valid email"
                  )
                ) : (
                  <br />
                )}
              </p>
              <Button
                variant="contained"
                onClick={submitForm}
                color="primary"
                className={
                  validation.emailValidation ? "buttons" : "buttonDisbale"
                }
                component="span"
              >
                Reset password
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          class="path circle"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          class="path check"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          class="path circle"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <line
          class="path line"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="34.4"
          y1="37.9"
          x2="95.8"
          y2="92.3"
        />
        <line
          class="path line"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="95.8"
          y1="38"
          x2="34.4"
          y2="92.2"
        />
      </svg> */}
    </div>
  );
}
