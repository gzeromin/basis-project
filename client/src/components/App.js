import { Switch, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import Auth from "../hoc/auth";

import NavBar from "./views/NavBar/NavBar";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Footer from "./views/Footer/Footer";
import HomePage from "./views/Video/HomePage/HomePage";
import UploadPage from "./views/Video/UploadPage/UploadPage";
import DetailPage from "./views/Video/DetailPage/DetailPage";
import SubscriptionPage from "./views/Video/SubscriptionPage/SubscriptionPage";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className='views'>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video" component={Auth(HomePage, null)} />
          <Route exact path="/video/upload" component={Auth(UploadPage, true)} />
          <Route exact path="/video/subscription" component={Auth(SubscriptionPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(DetailPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
