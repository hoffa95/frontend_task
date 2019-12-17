import React from 'react';
import Avatar from '@material-ui/core/Avatar';
const ArticlePreview = (props: any) => {
  const article = props.article;
  const date = new Date(props.article.created);

  return (<div className="articles-container">
    <div className="preview-header">
      <Avatar src={article.author.image} style={{ width: 40, height: 40, alignSelf: 'center' }}>
        ?
      </Avatar>
      <div className="author-container">
        <div className="author-block">
          {article.author.username}
        </div>
        <div className="author-block small grey">
          {date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "."}
        </div>
      </div>
    </div>
    <a href={`/articles/${article.slug}`}>
      <h2 className="flex bold">
        {article.title}
      </h2>
      <p className="flex grey">
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