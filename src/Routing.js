import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Top from './Top';
import AddInfo from './AddInfo';

function Routing(){
  return(
    <div>
      <Routes>
        {/* 画面遷移 */}
        <Route path="/" element={<Top />} />
        <Route path="/AddInfo" element={<AddInfo />} />
      </Routes>
    </div>
  )
}
export default Routing;
