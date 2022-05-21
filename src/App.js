import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider';
import './styles/global.css';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

import DonorsRequests from '@/pages/donors/Requests';
import DonorsDonations from '@/pages/donors/Donations';
import DonorsAppointments from '@/pages/donors/Appointments';
import DonorsOrganizations from '@/pages/donors/Organizations';

import OrgsRequests from '@/pages/orgs/Requests';
import OrgsDonations from '@/pages/orgs/Donations';
import OrgsAppointments from '@/pages/orgs/Appointments';
import OrgsOrganizations from '@/pages/orgs/Organizations';
import OrgsPatients from '@/pages/orgs/Patients';

import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ResetPassword from '@/pages/ResetPassword';
import SignUp from '@/pages/SignUp';
import RequireAuth from '@/contexts/RequireAuth';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBloodTypes } from '@/redux/bloodTypes';
import { fetchProvinces } from '@/redux/provinces';
import { fetchOrgTypes, fetchOrgs } from '@/redux/orgs';
import API from '@/api/base';
import { LoadingOverlay } from '@mantine/core';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useSelector(state => state.users);

  const redirectPath = location.pathname || '/';

  const UNAUTH_ROUTES = [
    '/login',
    '/sign-up',
    '/reset-password'
  ];

  useEffect(() => {
    const auth = Cookies.get('avion_access_token');
    if (auth && !UNAUTH_ROUTES.includes(redirectPath)) {
      navigate(redirectPath, { replace: true });
    } else {
      if (auth) {
        return navigate('/', { replace: true });
      }
      navigate(redirectPath, { replace: true });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      dispatch(fetchBloodTypes());
      dispatch(fetchProvinces());
      dispatch(fetchOrgTypes());
      dispatch(fetchOrgs());
    }
  }, [isMounted]);

  let pendingRequests = 0;

  API.interceptors.request.use(request => {
    pendingRequests++;
    return request;
  }, null, { synchronous: true });

  API.interceptors.response.use(response => {
    pendingRequests--;

    if (pendingRequests <= 0) {
      setIsLoading(false);
    }
    return response;
  });

  return (
    <AuthProvider>
      {
        isLoading ? <LoadingOverlay visible={isLoading} /> :
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/reset-password" exact element={<ResetPassword />} />
            <Route path="/sign-up" exact element={<SignUp />} />

            <Route path="/" element={(
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            )} />
            {
              authUser?.role === 1 ?
                <>
                  <Route
                    path="/requests"
                    exact
                    element={(
                      <RequireAuth>
                        <DonorsRequests />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/donations"
                    exact
                    element={(
                      <RequireAuth>
                        <DonorsDonations />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/appointments"
                    exact
                    element={(
                      <RequireAuth>
                        <DonorsAppointments />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/organizations"
                    exact
                    element={(
                      <RequireAuth>
                        <DonorsOrganizations />
                      </RequireAuth>
                    )}
                  />
                </> :
                <>
                  <Route
                    path="/requests"
                    exact
                    element={(
                      <RequireAuth>
                        <OrgsRequests />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/donations"
                    exact
                    element={(
                      <RequireAuth>
                        <OrgsDonations />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/appointments"
                    exact
                    element={(
                      <RequireAuth>
                        <OrgsAppointments />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/organizations"
                    exact
                    element={(
                      <RequireAuth>
                        <OrgsOrganizations />
                      </RequireAuth>
                    )}
                  />
                  <Route
                    path="/patients"
                    exact
                    element={(
                      <RequireAuth>
                        <OrgsPatients />
                      </RequireAuth>
                    )}
                  />
                </>
            }
          </Routes>
      }
    </AuthProvider>
  );
}

export default App;
