import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { LoginFormPage } from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { HomePage} from "./components/HomePage";
import './index.css'
import { CreateListForm } from "./components/CreateListForm";
import { ViewListPage } from "./components/ViewListPage";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("state before attempting to restore user: ", isLoaded);
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)); //only after attempting to restore user is the isLoaded set to true  (after attempting to render).
  }, [dispatch]);

  return  (
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
            <Route exact path='/homepage'>
              <HomePage />
            </Route>
            <Route path="/view-list/:id">
              <ViewListPage />
            </Route>
            {/* <Route path="/login">
              <LoginFormPage />
            </Route> */}
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/create-list">
              <CreateListForm />
            </Route>
            {/* <Route path="/add/item/modal">
              <CreateItemForm />
            </Route> */}

            <Route path="/">
            <h2>404: Page Not Found</h2>
          </Route>
          </Switch>
        )}
    </>

  );
}

export default App;
