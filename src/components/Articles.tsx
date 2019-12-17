import React, { useEffect } from 'react';
import ArticlePreview from './ArticlePreview';
import { useStoreActions, useStoreState } from '../hooks';
import { Article } from '../model';

const Articles = ()=> {
  const fetchArticles = useStoreActions(actions => actions.articles.fetchArticles);
  const articles: Article[] = useStoreState(state => state.articles.articleList);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (<div className="main-container">{
    articles.map((article, idx) => (
      <ArticlePreview key={idx} article={article} />))
  }
  </div>)
}

export default Articles;