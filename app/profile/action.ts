"use server";

import { error } from "console";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string;
}

export async function getOrCreateUser(userData: UserData) {
  try {
    // Membuat objek FormData dan menambahkan data pengguna
    console.log(userData);

    // Mengirim permintaan ke server
    const res = await fetch(`${BASE_URL}/api/user`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      console.log(error);
    }

    // Mengambil respons dari server
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
