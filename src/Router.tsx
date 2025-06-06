import { Route, Routes } from 'react-router';
import Login from './screen/Login';
import Root from './components/Root';
import Main from './screen/Main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} >
        <Route index element={<Main />} />
      </Route>
      
      <Route path="login" element={<Login />} />


    </Routes>
  );
};

export default Router;
