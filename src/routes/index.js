import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ResetPassword from '@/pages/ResetPassword';
import SignUp from '@/pages/SignUp';
import Request from '@/pages/Request';
import Donation from '@/pages/Donation';
import Appointment from '@/pages/Appointment';
import Organization from '../pages/Organizations';

const routes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/reset-password" exact element={<ResetPassword />} />
      <Route path="/sign-up" exact element={<SignUp />} />
      <Route path="/requests" exact element={<Request />} />
      <Route path="/donations" exact element={<Donation />} />
      <Route path="/appointments" exact element={<Appointment />} />
      <Route path="/organizations" exact element={<Organization />} />
    </Routes>
  )
}

export default routes;
