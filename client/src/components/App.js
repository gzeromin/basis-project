import { Switch, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import Auth from "../hoc/auth";

import NavBar from "./views/NavBar/NavBar";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Footer from "./views/Footer/Footer";
import VideoPage from "./views/Video/VideoPage";
import MoviePage from "./views/Movie/MoviePage";
import MasterPage from "./views/MasterPage/MasterPage";
import BookPage from './views/Book/BookPage';
import ShopPage from './views/Shop/ShopPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className='views'>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/master/:subFunc" component={Auth(MasterPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/:subFunc" component={Auth(VideoPage, null)} />
          <Route exact path="/movie/:subFunc" component={Auth(MoviePage, null)} />
          <Route exact path="/book/:subFunc" component={Auth(BookPage, null)} />
          <Route exact path="/shop/:subFunc" component={Auth(ShopPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
