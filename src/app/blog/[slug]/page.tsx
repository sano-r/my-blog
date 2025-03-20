import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

interface PostParams{
    params:{
        slug: string;
    }
}

const postsDirectory = path.join(process.cwd(), 'data');

export async function generateStaticParams() {
  const filenames = await fs.readdir(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function Post({ params }:PostParams) {
  const {slug} = await params;
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}