import useSignUp from "./useSignUp";

import styles from "./sign-up.module.css";
import Layout from "../../layout";

import MathleTitle from "../../../components/mathle-title";
import MainButton from "../../../components/main-button";

import { 
  MAIL_TITLE, 
  MAIL_NAME, 
  PASSWORD_TITLE, 
  PASSWORD_NAME, 
  USERNAME_TITLE, 
  USERNAME_NAME, 
  NAME_TITLE, 
  NAME_NAME 
} from "./sign-up-texts";

export default function SignUp() {
  const {
    error,
    loading,
    onNameChange,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit
  } = useSignUp();

  return (
    <Layout>
      <MathleTitle title={ 'Sign up to' } />

      <section className={ styles[`sign-up__container`] }>
        {
          error && <p>{ error }</p>
        }

        {
          loading && <p>Loading...</p>
        }

        <form action="" className={ styles[`sign-up__form`] } onSubmit={ onSubmit }>
          <div className={ styles[`sign-up__input-container`] }>
            <label htmlFor={ NAME_NAME }>{ NAME_TITLE }</label>
            <input 
              type="text" 
              name={ NAME_NAME } 
              placeholder={ NAME_TITLE } 
              onChange={ onNameChange }
              />
          </div>

          <div className={ styles[`sign-up__input-container`] }>
            <label htmlFor={ USERNAME_NAME }>{ USERNAME_TITLE }</label>
            <input 
              type="text" 
              name={ USERNAME_NAME } 
              placeholder={ USERNAME_TITLE } 
              onChange={ onUsernameChange }
              />
          </div>

          <div className={ styles[`sign-up__input-container`] }>
            <label htmlFor={ MAIL_NAME }>{ MAIL_TITLE }</label>
            <input 
              type="email" 
              name={ MAIL_NAME } 
              onChange={ onEmailChange }
              />
          </div>

          <div className={ styles[`sign-up__input-container`] }>
            <label htmlFor={ PASSWORD_NAME }>{ PASSWORD_TITLE }</label>
            <input 
              type="password" 
              name={ PASSWORD_NAME } 
              onChange={ onPasswordChange }
              />
          </div>

          <MainButton>Sign Up</MainButton>

        </form>
      </section>

    </Layout>
  )
}
