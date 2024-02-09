import withAuth from '../../utils/withAuth';

import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import styles from '../../styles/panel.module.css';
import { useRouter } from 'next/router';

const Panel = () => {
  const [blogData, setBlogData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  const fetchBlogs = async () => {
    console.log('Fetching blogs for page:', pageNumber);
    if (loading) return;

    if (!hasNextPage) {
      console.log("no more blogs");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/all?page=${pageNumber}`);
      const responseData = await response.json();

      if (!Array.isArray(responseData.blogs)) {
        console.error('Invalid data structure: Missing or invalid "blogs" array.');
        return;
      }

      setHasNextPage(responseData.hasNextPage);
      setBlogData((prevData) => [...prevData, ...responseData.blogs]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
    console.log('Updated page number:', pageNumber);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    // console.log('Container Scroll:', containerRef.current.scrollTop, containerRef.current.scrollHeight, containerRef.current.clientHeight);
    if (container && container.scrollHeight - container.scrollTop === container.clientHeight && !loading) {
      console.log('Fetching more blogs...');
      fetchBlogs();
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener('scroll', handleScroll);

    // Cleanup event listener when component unmounts
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pageNumber, loading]);

  useEffect(() => {
    // Initial load
    fetchBlogs();

    // Cleanup event listener when component unmounts
    return () => {
      console.log('hii');
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log(`Blog with id ${id} deleted successfully`);
        window.location.reload();
      } else {
        console.error(`Failed to delete blog with id ${id}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className={styles.panelContainer} ref={containerRef}>

      <div className={styles.navbar}>
        <FaUserCircle size={20} className={styles.profileIcon} />
        <IoIosAdd size={30} />
        <MdEdit size={20} />
        <MdDelete size={20} />
        <FaPowerOff
        onClick={() => {
          localStorage.removeItem('token');
          router.push('/');
        }}
          className={styles.powerIcon}
         size={20} />
      </div>

      <div>
        <div className={styles.header}>
          <h2>Owner Panel</h2>
          <div>
          <img src='/logoImage.svg'></img>
          <h4>TAYAL TRAVELS</h4>
          </div>
        </div>
      </div>

      <div className={styles.mainBody} >

        <div 
        onClick={() => router.replace('/owner/upload-blog')} 
        className={styles.createBlog}>
          <h3>Create Blog</h3>
          <IoIosAdd size={30} />
        </div>

        <h3>Blogs</h3>

        <div className={styles.blogContainer}>

          {blogData.map((blog, index) => (
            <div key={index} className={styles.blogs}>
              <img src={blog.imageUrl} alt={`Blog Image - ${blog.title}`} />
              <h4>{blog.title}</h4>
              <div className={styles.imageTools}>
                <MdEdit size={20} className={styles.editTool}/>
                <MdDelete
                onClick={() => handleDelete(blog.id)}
                size={20} 
                className={styles.deleteTool}/>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default withAuth(Panel);
