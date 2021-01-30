import { from } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute.js";
import MenuBar from "./component/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/registro" component={Registro} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
