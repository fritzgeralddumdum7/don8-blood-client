import { Routes, Route } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ResetPassword from '@/pages/ResetPassword';
import SignUp from '@/pages/SignUp';

import DonorsRequests from '@/pages/donors/Requests';
import DonorsDonations from '@/pages/donors/Donations';
import DonorsAppointments from '@/pages/donors/Appointments';
import DonorsOrganizations from '@/pages/donors/Organizations';

import OrgsRequests from '@/pages/orgs/Requests';
import OrgsDonations from '@/pages/orgs/Donations';
import OrgsAppointments from '@/pages/orgs/Appointments';
import OrgsOrganizations from '@/pages/orgs/Organizations';
import OrgsPatients from '@/pages/orgs/Patients';

const routes = () => {
  const role = 2;

  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/reset-password" exact element={<ResetPassword />} />
      <Route path="/sign-up" exact element={<SignUp />} />
      {
        role === 1 ?
          <>
            <Route path="/requests" exact element={<DonorsRequests />} />
            <Route path="/donations" exact element={<DonorsDonations />} />
            <Route path="/appointments" exact element={<DonorsAppointments />} />
            <Route path="/organizations" exact element={<DonorsOrganizations />} />
          </> :
          <>
            <Route path="/requests" exact element={<OrgsRequests />} />
            <Route path="/donations" exact element={<OrgsDonations />} />
            <Route path="/appointments" exact element={<OrgsAppointments />} />
            <Route path="/organizations" exact element={<OrgsOrganizations />} />
            <Route path="/patients" exact element={<OrgsPatients />} />
          </>
      }
    </Routes>
  )
}

export default routes;
