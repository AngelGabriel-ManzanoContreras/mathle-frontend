import { useEffect, useState } from "react";

export default function useMainHeader() {
  const [ userLogged, setUserLogged ] = useState( false );

  useEffect( () => {
    const logginVar = localStorage.getItem( 'id_user' );
    if ( logginVar ) {
      setUserLogged( true );
    }
  }, [] );
  
  return {
    userLogged
  }
}
