import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home';
import Catalog from '../Pages/Catalog';
import Detail from '../Pages/Detail'
import Favorite from '../Pages/Favorite';

const RoutersElement = () => {
  return (
    <Routes >
      <Route path='/favorite' element={<Favorite />} ></Route>
      <Route path='/:category/:id' element={<Detail />} ></Route>
      <Route path='/:category' element={<Catalog />} ></Route>
      <Route exact path='/' element={<Home />} ></Route>
    </Routes>
  )
}

export default RoutersElement;