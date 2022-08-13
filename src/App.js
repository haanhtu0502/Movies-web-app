import Swiper from 'swiper';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import RoutersElement from './config/RoutersElement';



function App() {
  return (
    <BrowserRouter>     
        <div>
          <Header />
          <RoutersElement />
          <Footer />
        </div>  
    </BrowserRouter >




  );
}

export default App;
