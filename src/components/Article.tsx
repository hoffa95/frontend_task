import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useStoreState, useStoreActions } from '../hooks';
import MainNavbar from './MainNavbar';
import { Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom'

const Article: React.FC<RouteComponentProps> = ({ history }) => {
  let { slug } = useParams();
  const article = useStoreState(state => state.articles.currentArticle);
  const getArticle = useStoreActions(actions => actions.articles.getArticle)
  const date = new Date(article.created);
  const deleteArticle = useStoreActions(actions => actions.articles.deleteArticle);
  const handleDelete = () => {
    deleteArticle(slug!);
    history.push('/')
  }
  const handleEdit = () => {
    history.push(`/newarticle/${slug}`)
  }
  console.log(article);
  useEffect(() => {
    getArticle(slug!);
  }, [])
  return (<div>
    <MainNavbar />
    <h1 className="page-header">
      {article.title}
    </h1>
    <div className = "main-container">
      <h3>
      {article.description}
    </h3>
    
    <div className="article-body">
      {article.body}
    </div>
    </div>

    <Button type="button" variant="contained" color="primary" onClick={handleEdit}>EDIT</Button>
    <Button type="button" variant="contained" color="secondary" onClick={handleDelete}>DELETE</Button>
  </div>)
}
export default Article;