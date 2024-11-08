import { Fragment } from "react/jsx-runtime"
import { Link } from "react-router-dom";

import Up from "../../../components/up"
import MainHeader from "../../../components/main-header";

interface IAdminLayoutProps {
  children: React.ReactNode,
  props?: any
}

export default function AdminLayout({ children, ...props } : IAdminLayoutProps) {
  const LOCAL_ADMIN = `/admin`;

  return (
    <Fragment { ...props }>
      <MainHeader>
        <Link to={ LOCAL_ADMIN }>
          <strong>Dashboard</strong>
        </Link>
      </MainHeader>
      <main>
        { children }
      </main>
      <Up />
    </Fragment>
  )
}
