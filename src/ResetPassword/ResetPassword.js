import { useRef, useState, useEffect } from "react";
import "./ResetPassword.scss";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";

export default function ResetPassword() {
  const [data, setData] = useState({
    password: null,
    confrimPassword:null
  });

  const passwordRef = useRef();
  const passwordTwoRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const [validation, setvalidation] = useState({
    PasswordValidation: false,
    linkSent: false,
    inValidEmail: false,
    resetValidation:false
  });

  const changeData = (e) => {
    var name = e.target.name;
    if (name == "password") {
      console.log("coming inside password...........");
      const tests = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;

      var validate = tests.test(String(e.target.value));
      console.log(validate);
      if (validate) {
        setData({
          ...data,
          [name]: e.target.value,
        });
        setvalidation({
          ...validation,
          PasswordValidation: true,
        });
      } else {
        setvalidation({
          ...validation,
          PasswordValidation: false,
        });
      }
    }
    if (name == "confrimPassword") {
        console.log("coming inside password...........");
        const tests = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
  
        var validate = tests.test(String(e.target.value));
        console.log(validate);
        if (validate) {
          setData({
            ...data,
            [name]: e.target.value,
          });
          setvalidation({
            ...validation,
            resetValidation: true,
          });
        } else {
          setvalidation({
            ...validation,
            resetValidation: false,
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
        .post("http://localhost:9000/api/userData/resetPassword", data)
        .then((responses) => {
          console.log(responses);
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

  const refOneChange = (e) => {
    if (e.key === "Enter") {
      passwordTwoRef.current.focus();
      console.log("enter.........");
    }
  };

  const refTwoChange = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.focus();
      console.log("enter.........");
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
              <p>Password Changed successfully </p>
            </div>
          ) : (
            <div>
                <div className="passwordDiv">
            <h4>
             New Password <span>*</span>
            </h4>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              onKeyDown={refOneChange}
              onChange={(e) => changeData(e)}
              placeholder="Password"
              className="userName"
            />
            <p className="errormessage">
              {" "}
              {validation.PasswordValidation ? (
                <br />
              ) : data.password !== null ? (
                "please enter the valid password"
              ) : (
                <br />
              )}
            </p>
          </div>
           <div className="passwordDiv">
           <h4>
            Confrim Password <span>*</span>
           </h4>
           <input
             type="password"
             name="confrimPassword"
             ref={passwordTwoRef}
             onKeyDown={refTwoChange}
             onChange={(e) => changeData(e)}
             placeholder="Password"
             className="userName"
           />
           <p className="errormessage">
             {" "}
             {validation.resetValidation ? (
               <br />
             ) : data.confrimPassword !== null ? (
               "please enter the valid password"
             ) : (
               <br />
             )}
           </p>
         </div>
            </div>
          )}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Button
            variant="contained"
            onClick={submitForm}
            ref={buttonRef}
            color="primary"
            className={
              validation.emailValidation && validation.PasswordValidation
                ? "buttons"
                : "buttonDisbale"
            }
            component="span"
          >
            Register
          </Button>
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
