import { Link } from "react-router-dom";

import AdminLayout from "../admin-layout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h2>Dashboard</h2>

      <section> 
        <ul>
          <li>
            <Link to="users">{ `Users (Manage Admins)` }</Link>
          </li>
          <li>
            <Link to="articles">Articles</Link>
          </li>
          <li>
            <Link to="editor">{ `Editor (Create a new Article)` }</Link>
          </li>
        </ul>
      </section>
    </AdminLayout>
  )
}
