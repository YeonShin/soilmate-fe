import { Route, Routes } from 'react-router';
import Login from './screen/Login';
import Root from './components/Root';
import NotFound from './screen/NotFound';
import Dashboard from './screen/Dashboard';
import RequireAuth from './components/RequireAuth';
import Monitoring from './screen/Monitoring';
import Alerts from './screen/Alerts';
import Manage from './screen/Manage';
import Irrigation from './screen/Irrigation';
import Register from './screen/Register';

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path='register' element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Root />} >
            <Route index element={<Dashboard />} />
            <Route path='monitor' element={<Monitoring />} />
            <Route path='irrigation' element={<Irrigation/>} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='manage' element={<Manage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
