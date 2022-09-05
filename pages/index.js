import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../helpers/posts-util";

export default function HomePage(props) {
  return (
    <>
    <Head>
      <title>Aya's Blog</title>
      <meta name="description" content="I post about web development"/>
    </Head>
    <Hero/>
    <FeaturedPosts posts={props.posts}/>
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    },

    revalidate: 3600
  }
}
