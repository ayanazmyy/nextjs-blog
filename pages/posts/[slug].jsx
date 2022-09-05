import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getAllPostsData } from "../../helpers/posts-util";

function PostDetailPage(props) {
    return (
        <>
            <PostContent post={props.post} />
        </>

    )
}

export function getStaticProps(context) {
    const slug = context.params.slug;

    const selectedPost = getPostData(slug);

    return {
        props: {
            post: selectedPost
        },

        revalidate: 10
    }
}

export function getStaticPaths() {
    const allPosts = getAllPostsData();
    const slugs = allPosts.map(post => post.slug);
    const paths = slugs.map(slug => ({ params: { slug: slug } }))
    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export default PostDetailPage;