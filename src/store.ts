import { createStore, action, thunk } from 'easy-peasy';
import { StoreModel, Article , User } from './model';
import axios from 'axios';

const token = localStorage.getItem('token');

const store = createStore<StoreModel>({
  articles: {
    articleList: [],
    currentArticle: <Article>{},
    fetchArticles: thunk(async actions => {
      try {
        const res = await axios.get('/api/articles');
        const article = res.data.articles;
        actions.setArticleList(article);
      } catch(err){
        console.log(err);
      }
    }),
    getArticle: thunk(async (actions, slug) => {
      try {
        const res=await axios.get(`/api/articles/${slug}`);
        const article = res.data.article;
        actions.setCurrentArticle(article);
        console.log(article);
      } catch(err){
        console.log(err);
      }
    }),
    addArticle: thunk(async (actions, article) => {
        try {
          const res = await axios.post('/api/articles',
          {
            "article": {
              "title": article.title,
              "description": article.description,
              "body": article.body,
            }
          }, { headers: { "Authorization": `Bearer ${token}` } });

        } catch(err){
          console.log(err);
        }
    }),

    setArticleList: action((state, articles) => {
      state.articleList = articles;
    }),
    setCurrentArticle: action((state, article) => {
      state.currentArticle = article;
    }),
    deleteArticle: thunk(async (actions, slug) => {
        try{
          const res = await axios.delete(`/api/articles/${slug}`,
          { headers: { "Authorization": `Bearer ${token}` } });
          actions.removeArticle(slug);
          
        }catch(err){
          console.log(err);
        }
    }),
    removeArticle: action((state, slug) => {
      state.articleList = state.articleList.filter(article => article.slug !== slug)
    }),
    updateArticle: thunk(async(actions,article)=>{
      try{
        const res = await axios.put(`/api/articles/${article.slug}`, {
          "article": {
            "title": article.title,
            "description": article.description,
            "body": article.body,
          }
        }, { headers: { "Authorization": `Bearer ${token}` } });
      }catch(err){
        console.log(err);
      }
    })
  },
  user: {
    user: <User>{},
    login: thunk(async (actions, { email, password }, { getState }) => {
        try{
          const res = await axios.post('/api/users/login',
          {
            "user": {
              "email": email,
              "password": password,
            }
          });
          actions.setUser(res.data.user);
            localStorage.setItem('token', res.data.user.token);
        }catch(err){
          console.log(err);
          throw (err.response.data.errors);
        }
    }),
    setUser: action((state, user) => {
      state.user = user;
      localStorage.setItem('username', user.username);

    }),
    getUser: thunk(async (actions) => {
      try{
        const res = await axios.get('/api/user', { headers: { "Authorization": `Bearer ${token}` }, });
        actions.setUser(res.data.user);
      }catch(err){
        console.log(err);
            }
    }),
    updateUser: thunk(async (actions, user, password) => {

      try{
        const res = await axios.put('/api/user', {
          "user": {
            "email": user.email,
            "bio": user.bio,
            "image": user.image,
            "username": user.username,
          }
        }, { headers: { "Authorization": `Bearer ${token}` } });

      }catch(err){
        console.log(err);
      }
    }),
    register: thunk(async (actions, { username, email, password }) => {
        try{
          const res = await axios.post('/api/users',
          {
            "user": {
              "username": username,
              "email": email,
              "password": password,
            }
          });
          actions.setUser(res.data.user);
        }catch(err){
          console.log(err);
          throw (err.response.data._errors);
        }
    }),
    deleteUser: thunk(async (actions, slug) => {
        try{
          const res = await axios.delete(`/api/users/${slug}`,
          { headers: { "Authorization": `Bearer ${token}` } });
          localStorage.removeItem('token');
        }catch(err){
          console.log(err);
        }
    })
  }
});

export default store;