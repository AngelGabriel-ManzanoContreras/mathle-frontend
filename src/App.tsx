import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home';
import Explore from './pages/learn/explore';
import Subject from './pages/learn/subject';
import Topic from './pages/learn/topic';
import Article from './pages/learn/article';

import ArticleDashboard from './pages/admin/article-dashboard';
import AdminDashboard from './pages/admin/dashboard';
import Editor from './pages/admin/editor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='learn/:subject' element={<Subject />} />
        <Route path='learn/:subject/:topic' element={<Topic />} />
        <Route path='learn/:subject/:topic/:subtopic' element={<Article />} />

        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/articles' element={<ArticleDashboard />} />
        <Route path='admin/editor' element={<Editor />} />
        <Route path='admin/editor/:id' element={<Editor />} />
        <Route path='admin/editor/:subject' element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App