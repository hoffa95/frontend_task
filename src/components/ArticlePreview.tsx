import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const ArticlePreview = (props: any) => {
  const article = props.article;
  const date = new Date(props.article.created);
  return (<div className="articles-container">
    <div className="preview-header">
      <Avatar className = "avatar" data-testid="avatar" src={article.author.image}>
        ?
      </Avatar>
      <div className="author-container">
        <div className="author-block">
          <span data-testid="username">{article.author.username}</span>
        </div>
        <div className="author-block small grey">
          <span data-testid="created">{date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "."}</span>
        </div>
      </div>
    </div>
    <a data-testid="slug" href={`/articles/${article.slug}`}>
      <h2  data-testid="title" className="flex bold">
        {article.title}
      </h2>
      <p  data-testid="description" className="flex grey">
        {article.description}
      </p>
      <span className="small grey left">
        Read more...
    </span>
    </a>
    <hr className="grey line" />
  </div>)
}

export default ArticlePreview;