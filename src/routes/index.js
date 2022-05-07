import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ResetPassword from '@/pages/ResetPassword';
import SignUp from '@/pages/SignUp';

const routes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/reset-password" exact element={<ResetPassword />} />
      <Route path="/sign-up" exact element={<SignUp />} />
    </Routes>
  )
}

export default routes;
