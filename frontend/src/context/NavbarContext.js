// This context is used to update the state/style of the navbar depending on the route that is hit.

import { useState, useContext, createContext } from "react";

//create context
export const NavbarContext = createContext();

//use state and provider
export default function NavbarProvider({ children }) {
  console.log("context updated");
  const [navbarStyle, setNavLandingStyle] = useState("nav-wrapper-not-landing");

  return (
    <NavbarContext.Provider
      value={{ navbarStyle, setNavLandingStyle }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

// hook
export const useNavbar = () => useContext(NavbarContext);
