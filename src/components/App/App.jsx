import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from '../Layout'
import { ArticleList } from '../ArticleList'
import { Register } from '../Register'
import { Login } from '../Login'
import { Profile } from '../Profile'
import { Article } from '../Article'
import { NewArticle } from '../NewArticle'

import './App.scss'

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<ArticleList />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/articles/:slug/:edit" element={<NewArticle />} />
      <Route path="/new-article" element={<NewArticle />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  </Routes>
)

export default App
