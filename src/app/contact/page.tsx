"use client";
import { useState } from "react";
import Header from "../_components/Header";

interface Contact {
  name: string;
  email: string;
  message: string;
}

export default function Contactpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState<Contact>({name: "", email: "", message: ""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setContactInfo({name: name, email: email, message: message});
    console.log(JSON.stringify(contactInfo));
    
    // 送信後の処理（例：成功メッセージの表示、フォームのリセットなど）
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-2xl p-4 mt-[70px]">
        <h1 className="text-2xl font-bold mb-10">お問い合わせ</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              名前
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={5}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-zinc-500 hover:bg-zinc-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
