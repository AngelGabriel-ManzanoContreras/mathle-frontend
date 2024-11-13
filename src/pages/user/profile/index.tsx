import useUserProfile from "./useUserProfile";

import { Link } from "react-router-dom";

import Layout from "../../layout";

export default function UserProfile() {
  const { userName, email, name, lists } = useUserProfile();

  return (
    <Layout>
      <h2>Hi there { userName }</h2>
      <br />
      <hr />
      <p><strong>Your data</strong></p>
      <p>Name: {name}</p>
      <p>Email: <a href={`mailto:${ email }`}>{email}</a></p>
      <br />
      <hr />

      <br />
      <p><strong>Your Lists</strong></p>
      <ul>
        {lists.map((list, index) => (
          <li key={index}>
            <Link to={`/list/${list.ID_List}`}>{list.list_name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
