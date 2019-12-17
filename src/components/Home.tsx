import React from 'react';
import MainNavbar from './MainNavbar';
import Articles from './Articles';

const Home = () => {
  return (
    <div>
      <MainNavbar />
      <h1 className="page-header">ARTICLES</h1>
      <Articles />
    </div>
  )
}
export default Home;
