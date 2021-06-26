import { useEffect, useRef, useState } from "react";
import "./Registeration.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";

export default function RegisterForm() {
  const [data, setData] = useState({
    name: null,
    email: null,
    password: null,
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();

  useEffect(()=>{
    nameRef.current.focus()
  },[])

  const [validation, setvalidation] = useState({
    emailValidation: false,
    userNameValidation: false,
    PasswordValidation: false,
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
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const submitForm = async () => {
    if (data.name && data.email && data.password) {
      console.log("form submited", data);
      await axios
        .post("http://localhost:9000/api/userData/register", data)
        .then((responses) => {
          if (responses.data.status == true) {
            toast.success("Successfully Registered", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log("coming here............");
          setvalidation({ inValidEmail: true });
        });
    }
  };

  const refOneChange = (e)=>{
    if(e.key==='Enter'){
      emailRef.current.focus()
      console.log("enter.........")
    }
  }
  
  const refTwoChange = (e)=>{
    if(e.key==='Enter'){
      passwordRef.current.focus()
      console.log("enter.........")
    }
  }
  
  const refThreeChange = (e)=>{
    if(e.key==='Enter'){
      buttonRef.current.focus()
      console.log("enter.........")
    }
  }

  return (
    <div>
      {console.log(data)}
      <div className="App">
        <div className="innerDiv">
          <div className="userDiv">
            <h4>
              User Name <span>*</span>
            </h4>
            <input
              type="text"
              name="name"
              ref={nameRef}
              onKeyDown={refOneChange}
              onChange={(e) => changeData(e)}
              placeholder="UserName"
              className="userName"
            />
            <p className="errormessage">
              {data.name !== null ? (
                data.name == "" ? (
                  "Please enter the user name"
                ) : (
                  <br />
                )
              ) : (
                <br />
              )}
            </p>
          </div>
          <div className="emailDiv">
            <h4>
              Email <span>*</span>
            </h4>
            <input
              type="email"
              name="email"
              ref={emailRef}
              onKeyDown={refTwoChange}
              onChange={(e) => changeData(e)}
              placeholder="Email"
              className="userName"
            />
            <p className="errormessage">
              {validation.emailValidation ? (
                <br />
              ) : data.email !== null ? (
                validation.inValidEmail ? (
                  "Email id already exists"
                ) : (
                  "please enter the valid email"
                )
              ) : (
                <br />
              )}
            </p>
          </div>
          <div className="passwordDiv">
            <h4>
              Password <span>*</span>
            </h4>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              onKeyDown={refThreeChange}
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
    </div>
  );
}
