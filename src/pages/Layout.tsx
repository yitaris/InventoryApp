import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className='flex-1 ml-15 p-20'>
         <Outlet />
      </div>
    </div>
  );
};

export default Layout;