"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import WebApp from "@twa-dev/sdk";

import { Bot } from "grammy";
const BOT_TOKEN =
  process.env.BOT_TOKEN || "8179858662:AAHCbffRvIyBpduf32GmxeqtdmGhjB8nLL8"; // Ganti dengan token yang aman

const BottomNav = () => {
  const [photoPath, setPhotoPath] = useState<string | undefined>("");
  useEffect(() => {
    const initializeUserData = async () => {
      if (typeof window !== "undefined" && WebApp.initDataUnsafe.user) {
        const user = WebApp.initDataUnsafe.user;

        const bot = new Bot(BOT_TOKEN);

        try {
          const userPhoto = await bot.api.getUserProfilePhotos(user.id);
          if (userPhoto.total_count > 0) {
            const fileId = userPhoto.photos[0][0].file_id;
            const file = await bot.api.getFile(fileId);
            const filePath = file.file_path;

            setPhotoPath(filePath);
          }
        } catch (error) {
          console.error("Error fetching or creating user:", error);
        }
      }
    };

    initializeUserData();
  }, []);
  return (
    <div className="w-full h-screen">
      <section
        id="bottom-navigation"
        className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-black shadow py-4 px-4"
      >
        <div id="tabs" className="flex justify-between ">
          <Link
            href="/"
            className="flex-1 text-center pt-2 pb-1 mx-2  flex justify-center"
          >
            <li className="flex flex-col">
              <svg
                aria-label="Home"
                className="_ab6-"
                color="#fafafa"
                fill="#fafafa"
                height={24}
                role="img"
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
              </svg>
              <p className="text-xs mt-1 font-sans -ml-1">Home</p>
            </li>
          </Link>

          <Link
            href="/explore"
            className="flex-1 text-center pt-2 pb-1 mx-2  flex justify-center"
          >
            <li className="flex flex-col">
              <svg
                aria-label="Explore"
                className="_ab6-"
                color="#fafafa"
                fill="#fafafa"
                height={24}
                role="img"
                viewBox="0 0 24 24"
                width={24}
              >
                <polygon
                  fill="none"
                  points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <polygon
                  fillRule="evenodd"
                  points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                />
                <circle
                  cx="12.001"
                  cy="12.005"
                  fill="none"
                  r="10.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <p className="text-xs font-sans mt-1 -ml-1">Explore</p>
            </li>
          </Link>

          <Link
            href="/addPost"
            className="flex-1 text-center pt-2 pb-1 mx-2  flex justify-center"
          >
            <li className=" flex flex-col">
              <svg
                color="#fafafa"
                fill="#fafafa"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                />
              </svg>
            </li>
          </Link>

          <Link
            href="/addPost"
            className="flex-1 text-center pt-2 pb-1 mx-2  flex justify-center"
          >
            <li className="flex flex-col">
              <svg
                aria-label="Reels"
                className="_ab6-"
                color="#fafafa"
                fill="#fafafa"
                height={24}
                role="img"
                viewBox="0 0 24 24"
                width={24}
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                />
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fillRule="evenodd"
                />
              </svg>
              <p className="font-sans text-xs mt-1">Reels</p>
            </li>
          </Link>

          <Link
            href="/profile"
            className="flex-1 text-center pt-2 pb-1 mx-2  flex justify-center"
          >
            <li className="flex flex-col">
              <Avatar
                imageUrl={`https://api.telegram.org/file/bot${BOT_TOKEN}/${photoPath}`}
              />
              <p className="font-sans text-xs mt-1 -ml-1">Profile</p>
            </li>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
