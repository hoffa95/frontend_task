import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import { useStoreState, useStoreActions } from '../hooks';
import { Formik, Form } from 'formik';
import MyTextField from '../helpers/MyTextField';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { RouteComponentProps } from 'react-router-dom'

const Profile: React.FC<RouteComponentProps> = ({ history }) => {
  const user = useStoreState(state => state.user.user);
  const getUser = useStoreActions(actions => actions.user.getUser);
  const updateUser = useStoreActions(actions => actions.user.updateUser);
  const deleteUser = useStoreActions(actions => actions.user.deleteUser);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    history.push('/');
  }
  const handleDelete = async () => {
    await deleteUser(user.email);
    history.push('/');
  }
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, [])
  console.log(user);
  return (
    <div>
      <MainNavbar />
      <div className="main-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 'auto', }}>
          <h2 style={{ fontWeight: "bold" }}>{user.username}</h2>
          <Avatar src={user.image} style={{ width: 50, height: 50, alignSelf: 'center' }}>
            ?
          </Avatar>
          <div>{user.bio}</div>
        </div>
        <Formik
          enableReinitialize={true}
          validateOnChange={true}
          initialValues={{ username: user.username || '', emailAddress: user.email || '', password: '', confirmPassword:'', bio: user.bio || '', image: user.image || '' }}
          onSubmit={async (data) => {
            console.log(data);
            try {
              await updateUser({ username: data.username, email: data.emailAddress, bio: data.bio, image: data.image });

            } catch (err) {
              console.log(err);
              alert(err);
            }
            getUser();
          }}
          >
          {() => (
            <Form >
              <div>
                <MyTextField
                  name="username"
                  variant="outlined"
                  label="Username"
                />
              </div>
              <div>
                <MyTextField
                  name="emailAddress"
                  type="email"
                  label="Email"
                  variant="outlined"
                />
              </div>
              <div>
                <MyTextField
                  name="bio"
                  variant="outlined"
                  label="Bio"
                />
              </div>
              <div>
                <MyTextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                />
              </div>
              <div >
                <Button type="submit" variant="contained" color="primary"   >UPDATE</Button>
                <Button type="button" variant="contained" color="default"   onClick={() => { history.push('/') }}>CANCEL</Button>
                <Button type="button" variant="contained" color="secondary" onClick={handleLogout}>LOGOUT</Button>
                <Button type="button" variant="contained" color="secondary" onClick={handleDelete}>DELETE USER</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Profile;