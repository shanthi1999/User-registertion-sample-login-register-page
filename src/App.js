import "./App.css";
import RegisterForm from "./Registeration/Registertion";
import Login from "./Login/Login";
import Header from "./Header/Header";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./Loading/Loading";
import ResetPassword from './ResetPassword/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={Loading} />
          <Route path="/RegisterForm" component={RegisterForm} />
          <Route path="/Login" component={Login} />
          <Route path="/ForgetPassword" component={ForgetPassword} />
          <Route path="/ResetPassword" component={ResetPassword} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
