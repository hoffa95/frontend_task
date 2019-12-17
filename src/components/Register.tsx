import React, { useState } from 'react';
import { Button } from '@material-ui/core'
import { Form, Formik } from 'formik';
import { useStoreActions } from '../hooks';
import { Link, RouteComponentProps } from 'react-router-dom'
import MyTextField from '../helpers/MyTextField';
import validationSchema from '../helpers/validationSchema'
import MainNavbar from './MainNavbar';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const register = useStoreActions(actions => actions.user.register);
  const [errorMessages, setErrorMessages] = useState(['']);
  return (
    <div>
      <MainNavbar />
      <h1 className="page-header">Register</h1>
      <div>{errorMessages.map((msg, idx) => (
        <p className="alert-text" key={idx}>{msg}</p>
      )
      )}</div>
      <div className="main-container">
        <Formik
          validateOnChange={true}
          initialValues={{ username: "", emailAddress: "", password: "", confirmPassword: "" }}
          onSubmit={async (data) => {
            console.log(data);
            try {
              await register({ username: data.username, email: data.emailAddress, password: data.password });
              history.push('/login');

            } catch (err) {
              let messages = Object.keys(err).map((key: string, idx: number) => {
                return err[key];
              })
              console.log(messages);
              setErrorMessages(messages);
            }
          }}
          validationSchema={validationSchema}>
          {() => (
            <Form >
              <div>
                <MyTextField
                  name="username"
                  label="Username"
                  variant="outlined"
                />
              </div>
              <div>
                <MyTextField
                  name="emailAddress"
                  type="email"
                  variant="outlined"
                  label="E-mail" />
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
                <MyTextField
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  variant="outlined"
                />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary" >SUBMIT</Button>
                <Link to="/login" className="btn btn-link">Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default Register;