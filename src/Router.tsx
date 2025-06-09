import { Route, Routes } from 'react-router';
import Login from './screen/Login';
import Root from './components/Root';
import NotFound from './screen/NotFound';
import Dashboard from './screen/Dashboard';
import RequireAuth from './components/RequireAuth';

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Root />} >
        <Route index element={<Dashboard />} />
        {/* 농장 관리 관련 페이지 라우팅 */}
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
