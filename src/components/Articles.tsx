import React, { useEffect } from 'react';
import ArticlePreview from './ArticlePreview';
import { useStoreActions, useStoreState } from '../hooks';
import { Article as IArticle } from '../model';

const Articles = (props: any) => {
  const fetchArticles = useStoreActions(actions => actions.articles.fetchArticles);
  const articles: IArticle[] = useStoreState(state => state.articles.articleList);
  console.log(articles);

  useEffect(() => {
    fetchArticles();
  }, [])
  return (<div className="main-container">{
    articles.map((article, idx) => (
      <ArticlePreview key={idx} article={article} />
    )
    )
  }

  </div>

  )


}

export default Articles;