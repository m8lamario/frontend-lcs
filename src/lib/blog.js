import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getSortedPostsData(city = null) {
  // Get file names under /content/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id/slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        ...matterResult.data,
      };
    });

  // Filter by city if provided
  let filteredPosts = allPostsData;
  if (city) {
    filteredPosts = allPostsData.filter(post => 
      post.city?.toLowerCase() === city.toLowerCase()
    );
  }

  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          blog: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Return the data and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
