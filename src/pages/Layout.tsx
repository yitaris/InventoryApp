import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className='flex-1 pl-[72px] p-5 sm:p-10 md:p-20'>
         <Outlet />
      </div>
    </div>
  );
};

export default Layout;