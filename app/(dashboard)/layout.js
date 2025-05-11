
import Sidebar from '@/components/Sidebar';
import DasboardContent from '../../components/DasboardContent';

const layout = ({ children }) => {
  return (
    <div className='drawer lg:drawer-open h-dvh overflow-hidden'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <DasboardContent>{children}</DasboardContent>
      <Sidebar />
    </div>
  );
};
export default layout;