import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { ubinl } from '../assets';
const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className='flex-1 ml-15 p-20'>
         <Outlet />
         <img
                    src={ubinl}
                    className="w-20 h-auto absolute top-15 right-15"
                />
      </div>
    </div>
  );
};

export default Layout;