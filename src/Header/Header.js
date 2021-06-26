import { useState } from "react";
import "./Header.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default function Header() {
  const [state, setState] = useState({
    register: false,
    login: false,
    forgetPassword: false,
  });
  return (
    <div className="header">
      <div>Registeration - Login Form</div>
      <div className="links">
        <Link
          to="/RegisterForm"
          onClick={() =>
            setState({
              register: true,
              login: false,
              forgetPassword: false,
            })
          }
          className={state.register?"linkSuper":"linkOne"}
        >
          Registeration
        </Link>{" "}
        &nbsp;/ &nbsp;
        <Link
          to="/Login"
          onClick={() =>
            setState({
              register: false,
              login: true,
              forgetPassword: false,
            })
          }
          className={state.login?"linkSuper":"linkTwo"}
        >
          Login
        </Link>
        &nbsp;/ &nbsp;
        <Link
          to="/ForgetPassword"
          onClick={() =>
            setState({
              register: false,
              login: false,
              forgetPassword: true,
            })
          }
          className={state.forgetPassword?"linkSuper":"linkThree"}
        >
          ForgetPassword
        </Link>
      </div>
    </div>
  );
}
