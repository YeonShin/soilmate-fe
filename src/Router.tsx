import { Route, Routes } from 'react-router';
import Main from './screen/Main';
import Login from './screen/Login';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />

      
    </Routes>
  );
};

export default Router;
