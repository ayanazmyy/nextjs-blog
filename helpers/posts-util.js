import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(fileContent);
    const postData = {
        slug: postSlug,
        ...data,
        content
    }

    return postData;
}

export function getPostFiles() {
    const postFiles = fs.readdirSync(postsDirectory);
    return postFiles;
}

export function getAllPostsData() {
    const postFiles = getPostFiles();

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });

    const soretedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);

    return soretedPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPostsData();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}