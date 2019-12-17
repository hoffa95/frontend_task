import React, { useState, useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import { useStoreActions, useStoreState } from '../hooks';
import { RouteComponentProps } from 'react-router-dom'
import MainNavbar from './MainNavbar';
import { TextareaAutosize, Button } from '@material-ui/core'
import MyTextField from '../helpers/MyTextField';
import { useParams } from 'react-router';

const NewArticle: React.FC<RouteComponentProps> = ({ history }) => {
  const addArticle = useStoreActions(actions => actions.articles.addArticle);
  const getArticle = useStoreActions(actions => actions.articles.getArticle);
  const updateArticle = useStoreActions(actions => actions.articles.updateArticle);

  const article = useStoreState(state => state.articles.currentArticle);
  const [isEditMode, setIsEditMode] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    console.log(slug)
    if (slug !== undefined) {
      setIsEditMode(true);
      getArticle(slug!);
    }
  }, [])
  console.log(article);
  return (
    <div>
      <MainNavbar />
      <h1 className="page-header">{isEditMode ? "EDIT ARTICLE" : "WRITE A NEW ARTICLE"}</h1>
      <div className="main-container">
        <Formik
          enableReinitialize={true}
          initialValues={isEditMode ? { title: article.title, description: article.description, body: article.body} : { title: "", description: "", body: ""}}
          onSubmit={async (data) => {
            if (isEditMode) {
              await updateArticle({ slug: article.slug, title: data.title, description: data.description, body: data.body})
            } else {
              await addArticle({ title: data.title, description: data.description, body: data.body});
            }
            history.push('/');
          }}>
          {() => (
            <Form >
              <div>
                <MyTextField
                  name="title"
                  label="Title"
                  variant="outlined"
                />
              </div>
              <div>
                <MyTextField
                  name="description"
                  label="Description"
                  variant="outlined"
                />
              </div>
              <div>
                <Field name="body" style={{ width: "100%", margin: 10, padding: 10 }} aria-label="minimum height" rows={3} placeholder="Body ..." as={TextareaAutosize} />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary" >{isEditMode ? "UPDATE" : "ADD"}</Button>
                <Button type="button" variant="contained" color="default"  onClick={() => { history.push('/') }}>CANCEL</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default NewArticle;