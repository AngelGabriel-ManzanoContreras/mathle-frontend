import useSignIn from "./useSignIn";

import styles from "./sign-in.module.css";
import Layout from "../../layout";

import MathleTitle from "../../../components/mathle-title";
import MainButton from "../../../components/main-button";

import { 
  MAIL_TITLE, 
  MAIL_NAME, 
  PASSWORD_TITLE, 
  PASSWORD_NAME
} from "./sign-in-texts";

export default function SignUp() {
  const {
    error,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit
  } = useSignIn();

  return (
    <Layout>
      <MathleTitle title={ 'Sign in to' } />

      <section className={ styles[`sign-in__container`] }>
        {
          error && <p>{ error }</p>
        }

        {
          loading && <p>Loading...</p>
        }

        <form action="" className={ styles[`sign-in__form`] } onSubmit={ onSubmit }>

          <div className={ styles[`sign-in__input-container`] }>
            <label htmlFor={ MAIL_NAME }>{ MAIL_TITLE }</label>
            <input 
              type="email" 
              name={ MAIL_NAME } 
              onChange={ onEmailChange }
              />
          </div>

          <div className={ styles[`sign-in__input-container`] }>
            <label htmlFor={ PASSWORD_NAME }>{ PASSWORD_TITLE }</label>
            <input 
              type="password" 
              name={ PASSWORD_NAME } 
              onChange={ onPasswordChange }
              />
          </div>

          <MainButton>Sign In</MainButton>

        </form>
      </section>

    </Layout>
  )
}
