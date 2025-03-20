import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import Image from "next/image";

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
    <div className="container mx-auto p-4">
      <article className="prose prose-md max-w-3xl mx-auto">
      {data.image && (
          <div className="mb-4">
            <Image
              src={data.image}
              alt={data.title}
              width={1200}
              height={600}
            />
          </div>
        )}
        <h1 className="mb-4 text-3xl">{data.title}</h1>
        <p>{data.date}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}