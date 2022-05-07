import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home'
import Login from '../pages/Login'

const routes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
    </Routes>
  )
}

export default routes;
