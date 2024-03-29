import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button } from '@material-ui/core';
import { useStoreActions } from '../hooks';
import { RouteComponentProps } from 'react-router-dom'
import MyTextField from '../helpers/MyTextField'
import MainNavbar from './MainNavbar';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const login = useStoreActions(actions => actions.user.login);
  const [errorMessages, setErrorMessages] = useState(['']);
  
  return (
    <div>
      <MainNavbar />
      <h1 className="page-header">Login</h1>
      <div>
      {errorMessages.map((msg, idx) => (
        <p className="alert-text" key={idx}>{msg}</p>))}
      </div>
      <div className="main-container">
        <Formik
          initialValues={{ emailAddress: "", password: "" }}
          onSubmit={async (data) => {
            try {
              await login({ email: data.emailAddress, password: data.password });
              history.push('/');
            } catch (err) {
              let messages = Object.keys(err).map((key: string, idx: number) => {
                return err[key];
              })
              setErrorMessages(messages);
            }
          }}
          >
          {() => (
            <Form >
              <div>
                <MyTextField
                  name="emailAddress"
                  type="email"
                  label="E-mail"
                  variant="outlined"
                />
              </div>
              <div>
                <MyTextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary">LOGIN</Button>
                <Button type="button" variant="contained" color="default" onClick={() =>{history.push('/register');}}>Register</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login;