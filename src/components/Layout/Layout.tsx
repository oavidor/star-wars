import { ReactNode, FC } from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="layout">{children}</div>
    </div>
  );
};

export default Layout;
