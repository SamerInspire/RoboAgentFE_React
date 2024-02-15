import { Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";

// components
import BlogHeader from "src/Core/Components/Blog/BlogHeader";
import BlogFilters from "src/Core/Components/Blog/BlogFilters";
import Blogs from "src/Core/Components/Blog/Blogs";
import { Helmet } from "react-helmet";

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),
}));

const Blog = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Blogs | RoboAgent</title>
      </Helmet>

      <ContainerStyle maxWidth="lg">
        {/* Header */}
        <BlogHeader />

        {/* Blog Filters */}
        <BlogFilters />

        {/* All blogs */}
        <Blogs />
      </ContainerStyle>
    </>
  );
};

export default Blog;
