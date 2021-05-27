import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container } from "@material-ui/core";
import Footer from './components/Header/MainNav';
import Header from './components/Header/header'
import Login from '../src/components/Login';
import  MainCarousel from '../src/components/Carousel/Carousel';
import Movies from './components/Pages/Movies';
import Navbar from './components/Navbar';
import Register from '../src/components/Register';
import Search from './components/Pages/Search';
import Series from './components/Pages/Series';
import Trending from './components/Pages/Trending';
import logo from './logo.svg';

function App() {
  return (
    
     <BrowserRouter>
      <Navbar/>
      
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Container>
      </div>
     
      <Footer />
    </BrowserRouter>
  );
}
    

export default App;
