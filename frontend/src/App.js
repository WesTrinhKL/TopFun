import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LoginFormPage } from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("state before attempting to restore user: ", isLoaded);
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)); //only after attempting to restore user is the isLoaded set to true  (after attempting to render).
  }, [dispatch]);

  return isLoaded && (
    <div>
    <div>hello, this is the value of isLoaded: {`${isLoaded}`}</div>
    <Switch>
      <Route path='/login'>
        <LoginFormPage/>
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
