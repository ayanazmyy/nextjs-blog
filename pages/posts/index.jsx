import AllPosts from "../../components/posts/all-posts";
import { getAllPostsData } from "../../helpers/posts-util";
import Head from "next/head";
function AllPostsPage(props) {
    return (
        <>
            <Head>
                <title>All posts</title>
                <meta name="description" content="My all posts" />
            </Head>
            <AllPosts posts={props.posts} />
        </>

    )
}

export function getStaticProps() {
    const allPosts = getAllPostsData();

    return {
        props: {
            posts: allPosts
        },

        revalidate: 3600
    }
}
export default AllPostsPage;