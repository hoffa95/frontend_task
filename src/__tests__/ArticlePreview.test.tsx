import React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react"
import ArticlePreview from '../components/ArticlePreview';

describe("<ArticlePreview />", () => {
  test("should display an article", async () => {
    const article = {
      title:"title",
      description:"description",
      body:"body",
      created:"2019-12-16T20:48:59.000Z",
      slug:"slug",
      author:{
        username:"user",
        image:""
      }
    }
    const {container,getByTestId} = render(<ArticlePreview article={article}
    />)

    const username = getByTestId('username');
    const title = getByTestId('title');
    const description = getByTestId('description');
    const created = getByTestId('created');
    const slug = getByTestId('slug');

    expect(username.innerHTML).toBe(article.author.username);
    expect(title.innerHTML).toBe(article.title);
    expect(description.innerHTML).toBe(article.description);
    expect(created.innerHTML).toBe('2019.12.16.');
    expect(slug.getAttribute('href')).toBe(`/articles/${article.slug}`)
  });
});