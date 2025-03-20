import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const postsDirectory = path.join(process.cwd(), "data");

export default function Blog() {
  //ファイル名を取得
  const filenames = fs.readdirSync(postsDirectory);
  // ファイル名に対してコールバック関数を実行し結果を詰める
  const posts = filenames.map((filename) => {
    // 記事の完全パスを取得
    const filePath = path.join(postsDirectory, filename);
    // 中身を読む
    const fileContents = fs.readFileSync(filePath, "utf8");
    // メタデータのみ取得
    const { data } = matter(fileContents);
    // ファイル名をurlの識別子に使うための変数slugに格納
    const slug = filename.replace(/\.md$/, "");
    const result = {
      slug: slug,
      title: data.title,
      id: data.id,
      date: data.date,
    };
    return result;
  });

  return (
    <div>
      <h1>ブログ</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
