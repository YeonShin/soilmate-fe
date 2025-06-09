import { Route, Routes } from 'react-router';
import Login from './screen/Login';
import Root from './components/Root';
import NotFound from './screen/NotFound';
import Dashboard from './screen/Dashboard';
import RequireAuth from './components/RequireAuth';
import Monitoring from './screen/Monitoring';
import Watering from './screen/Watering';
import Alerts from './screen/Alerts';
import Manage from './screen/Manage';

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Root />} >
          <Route>
            <Route index element={<Dashboard />} />
            <Route path='monitor' element={<Monitoring />} />
            <Route path='watering' element={<Watering />} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='manage' element={<Manage />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
