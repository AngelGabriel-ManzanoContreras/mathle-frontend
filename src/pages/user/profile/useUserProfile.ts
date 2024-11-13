import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetchData from "../../../logic/utils/fetch";

export default function useUserProfile() {
  const [ userID, setUserID ] = useState<string | null>(null);
  const [ userName, setUserName ] = useState<string | null>(null);
  const [ email, setEmail ] = useState<string | null>(null);
  const [ name, setName ] = useState<string | null>(null);
  const navigate = useNavigate();

  const getIDfromLocalStorage = async() => {
    const id = await localStorage.getItem("id_user");
    console.log(id);
    if (id) {
      setUserID(id);
    } else {
      navigate("/sign-in");
    }
  }

  const getUserProfile = async () => {
    const response = await fetchData(`user/${userID}`);
    if ( !response ) {
      //localStorage.removeItem("id_user");
      navigate("/sign-in");
    }

    if ( response ) {
      const data = await response.data;
      setUserName(data.username);
      setEmail(data.mail);
      setName(data.name);
      return
    }
  }


  useEffect(() => {
    getIDfromLocalStorage();
  }, []);

  useEffect(() => {
    if (userID) {
      getUserProfile();
    }
  }, [userID]);

  return {
    userName,
    email,
    name
  }
}
