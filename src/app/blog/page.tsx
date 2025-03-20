import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import localPict from "../../../public/header.jpg"

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My-Blog</h1>
      <div className="mb-6 ">
        <Image
          src={localPict}
          alt="ブログヘッダー"
          width={1200} // 画像の幅を指定
          height={400} // 画像の高さを指定
          className="w-screen h-[240px]"
        />
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {posts.sort((a, b) => {
            if(a.id > b.id) return -1;
            if(a.id < b.id) return 1;
            return 0;
        }).map((post) => (
          <li
            key={post.slug}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
