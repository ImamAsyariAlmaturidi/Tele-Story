"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import anime from "../../public/anime.gif";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengatur timer untuk menampilkan loading lebih lama
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000ms = 3 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmounted
  }, []);

  if (isLoading) {
    return <Image src={anime} width={400} alt="Gif Loading.." />;
  }

  return null; // Atau Anda bisa mengembalikan komponen lain setelah loading
};

export default Loading;
