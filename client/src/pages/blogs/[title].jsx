import BlogPage from '../../components/BlogPageComponents/BlogPage/blogPage';

const DynamicBlogPage = ({ blogData }) => {
  return <BlogPage blogData={blogData} />;
};

export async function getServerSideProps(context) {
  try {
    const title = context.params.title;
    const response = await fetch(`http://localhost:3001/api/blogs/${title}`);
    const blogData = await response.json();

    if (response.ok) {
      return {
        props: {
          blogData,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      notFound: true,
    };
  }
}

export default DynamicBlogPage;
