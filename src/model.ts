import { Action, Thunk } from 'easy-peasy';

interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface User {
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  created: string;
  updated: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
 type ArticlesModel = {
  currentArticle: Article;
  articleList: Article[];
  fetchArticles: Thunk<ArticlesModel>;
  getArticle:Thunk<ArticlesModel,string>
  setCurrentArticle:Action<ArticlesModel,Article>;
  setArticleList:Action<ArticlesModel,Article[]>;
  addArticle: Thunk<ArticlesModel,{title:string,description:string,body:string}>;
  updateArticle:Thunk<ArticlesModel,{slug:string,title:string,description:string,body:string}>;
  deleteArticle: Thunk<ArticlesModel,string>;
  removeArticle: Action<ArticlesModel,string>;
}

type UserModel = {
  user:User;
  login: Thunk<UserModel,{email:string,password:string}>;
  register: Thunk<UserModel,{username:string,email:string,password:string}>;
  setUser: Action<UserModel,User>;
  getUser: Thunk<UserModel>;
  updateUser: Thunk<UserModel,User,string>;
  deleteUser: Thunk<UserModel,string>;
}

export type StoreModel = {
  articles: ArticlesModel;
  user: UserModel;
}