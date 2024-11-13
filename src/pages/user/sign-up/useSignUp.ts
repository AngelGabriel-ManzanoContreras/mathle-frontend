import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import fetchData from '../../../logic/utils/fetch';

export default function useSignUp() {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState( false );
  const [ correct, setCorrect ] = useState( false );

  const navigate = useNavigate();

  const handleInputChange = ( setValue : Function ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
    

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = {
      name,
      username,
      email,
      password,
      signup : true
    }

    const response = await fetchData('user', 'POST', data);
    if ( !response ) setError('An error occurred, please try again');

    if ( response && response.data?.id_user ) {
      const id_user = response.data.id_user;
      localStorage.setItem('id_user', JSON.stringify( id_user ));
      setCorrect(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    if ( correct ) {
      navigate('/user/profile');
    }
  }, [ correct ]);

  return {
    name,
    username,
    email,
    password,
    error,
    loading,
    correct,
    onNameChange: handleInputChange( setName ),
    onUsernameChange: handleInputChange( setUsername ),
    onEmailChange: handleInputChange( setEmail ),
    onPasswordChange: handleInputChange( setPassword ),
    onSubmit
  }
}
