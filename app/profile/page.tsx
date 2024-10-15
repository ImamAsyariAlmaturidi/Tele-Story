"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { getOrCreateUser } from "./action";
import Image from "next/image";
import anime from "../../public/anime.gif";
import { Bot } from "grammy";

const BOT_TOKEN =
  process.env.BOT_TOKEN || "7728815162:AAGl1ArHGF653Z0ElvQWtag5hbx5OmdnNDg"; // Ganti dengan token yang aman

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url: string;
}

export default function Home() {
  const [photoPath, setPhotoPath] = useState<string | undefined>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const initializeUserData = async () => {
      // Pastikan kita hanya menjalankan ini di sisi klien
      if (WebApp.initDataUnsafe.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        setUserData(user);

        const bot = new Bot(BOT_TOKEN);

        try {
          const userPhoto = await bot.api.getUserProfilePhotos(user.id);
          if (userPhoto.total_count > 0) {
            const fileId = userPhoto.photos[0][0].file_id;
            const file = await bot.api.getFile(fileId);
            const filePath = file.file_path;

            setPhotoPath(filePath);
          }

          const res = await getOrCreateUser(user);
          console.log("User created or fetched:", res);
        } catch (error) {
          console.error("Error fetching or creating user:", error);
        }
      }
    };

    initializeUserData();
  }, []);

  return (
    // <main className="p-4">
    //   {userData ? (
    //     <div className="rounded-lg p-10">
    //       <div className="flex flex-col gap-1 text-center items-center">
    //         {photoPath && (
    //           <img
    //             src={`https://api.telegram.org/file/bot7728815162:AAGl1ArHGF653Z0ElvQWtag5hbx5OmdnNDg/${photoPath}`}
    //             className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
    //             alt="memek"
    //           />
    //         )}
    //         <p className="font-semibold text-md font-mono">
    //           {userData.first_name}
    //         </p>
    //         {userData.username && (
    //           <>
    //             <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
    //               @{userData.username}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   ) : (
    //     <Image src={anime} width={400} alt="Gif Loading.." />
    //   )}
    // </main>
    <>
      {/* component */}
      {userData && (
        <div className="relative max-w-2xl mx-auto my-3">
          {/* top navbar */}
          <div className="flex justify-between items-center text-sm mx-5">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
            <div className="flex gap-2">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* top navbar end */}
          {/* top header */}
          <div className="flex flex-col justify-center items-center my-5">
            <div
              className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full"
              style={{
                backgroundImage: `url(https://api.telegram.org/file/bot${BOT_TOKEN}/${photoPath})`,
              }}
            />

            <span className="my-2 text-lg font-mono">
              {userData.first_name}
            </span>
            {userData.username && (
              <span className="my-3">@{userData.username}</span>
            )}
            <div className="flex gap-10 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-bold">10</span>
                <span>Following</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold">1.20 K</span>
                <span>Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold">100 K</span>
                <span>Likes</span>
              </div>
            </div>
            <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400">
              Edit profile
            </button>
            <p className="mb-3">Description about me goes here</p>
          </div>
          {/* top header end */}
          {/* middle navigation */}
          <div className="grid grid-cols-4">
            <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="border-b-2 border-gray-600 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
            <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </button>
            <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
            <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          {/* middle navigation end */}
          {/* video grid */}
          <div className="grid grid-cols-4 gap-0.5 mt-2">
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://sf-tk-sg.ibytedtos.com/obj/tiktok-web-sg/tt-sg-article-cover-351970d5103b996fbe9ddc67f6d668cc.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/originals/05/d3/80/05d38056f155a2e852691a62546413cf.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://cdn.acidcow.com/pics/20190628/gifs_14.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://www.allkpop.com/upload/2021/06/comment/260124/1624685055-tumblr-72b06bab00d71145f9900a3bdd40a288-e6d20803-500.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            {/* ///////////// */}
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://media0.giphy.com/media/5tujxS8BprYWkDzjXM/giphy.gif?cid=790b7611f58c0b916eb59574df025c7ca891a396c6176d14&rid=giphy.gif&ct=g")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/originals/a7/9e/bb/a79ebb256a2e8b450f6d29d813a538bf.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://media3.giphy.com/media/daOQ5lE52dUhgD8acn/giphy.gif?cid=790b7611359354d7bdfe94465e3f7a6dc892e92e85b0da7e&rid=giphy.gif&ct=g")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://media2.giphy.com/media/GMKSiOWWSyRv1P0G0s/giphy.gif?cid=790b76117872dd4d66aab9bcec13817a9ce1043478fbcc59&rid=giphy.gif&ct=g")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            {/* //////////// */}
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://66.media.tumblr.com/ec902eca6ef176851823e29314d56ede/f90bf85c8b66de71-3a/s400x600/419ad07f433f14b8851af32ecedc2ea0f64e1a18.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://media4.giphy.com/media/lnPEWRyHHQhKuFsNLo/giphy.gif?cid=790b76115514496b47f0100da633cdce8e29f904cea6f308&rid=giphy.gif&ct=g")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://c.tenor.com/ooA0qXfBTUEAAAAM/dog-tiktok.gif")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
            <div
              className="relative w-full h-60 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://64.media.tumblr.com/6407088ae4b520c36b0ca6f06cdbf8e3/7e615472c8228ae9-ba/s400x600/dba5fd9c77b1dd419a6bbe6c3ac73357ce7eebb8.gifv")',
              }}
            >
              {/* small player with views */}
              <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>800</span>
              </div>
              {/* small player with views end */}
            </div>
          </div>
          {/* video grid end */}
        </div>
      )}
    </>
  );
}
