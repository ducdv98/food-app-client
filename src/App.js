import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DishDetails from "./pages/DishDetails";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSumary";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Header></Header>
      <Switch>
        <Route exact path={['/', '/menu']} component={Menu} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <PrivateRoute>
          <Route exact path={'/dishes/:id'} component={DishDetails} />
          <Route exact path={'/cart/'} component={Cart} />
          <Route exact path={'/order-summary/'} component={OrderSummary} />
          <Route exact path={'/orders/'} component={Orders} />
          <Route exact path={'/orders/:id'} component={OrderDetails} />
        </PrivateRoute>

      </Switch>
      <Footer></Footer>
    </Router>
  );
};


export default App;