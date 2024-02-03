import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components/pages
import MainPage from './Pages/MainPage/mainPage';
import BlogPage from './Pages/BlogPage/blogPage';
import BlogForm from './Pages/BlogUploadPage/uploadBlog';

// import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blogs/:title" element={<BlogPage />} />

        <Route path="/master/upload-blog" element={<BlogForm />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
