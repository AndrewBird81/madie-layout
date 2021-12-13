import React from "react";

import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import OktaSecurity from "./okta/OktaSecurity";
import MainNavBar from "./components/MainNavBar/MainNavBar";
import AppWithRouterAccess from "./okta/AppWithRouterAccess";

export default function Root(props) {
  return (
    <>
      <GlobalStyles />
      <MainNavBar />
      <BrowserRouter>
        <AppWithRouterAccess />
      </BrowserRouter>
    </>
  );
}
