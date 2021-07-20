import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LoginFormPage } from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import './index.css'
import { useNavbar } from "./context/NavbarContext";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("state before attempting to restore user: ", isLoaded);
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)); //only after attempting to restore user is the isLoaded set to true  (after attempting to render).
  }, [dispatch]);

  return isLoaded && (
    // <div className="app-container">
    //   <div className="app-navbar--sticky">

    //   </div>
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
    </>

  );
}

export default App;
