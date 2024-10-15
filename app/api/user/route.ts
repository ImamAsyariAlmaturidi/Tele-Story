"use server";
import { findOrCreateUserById } from "@/app/db/models/User";
import { NextResponse, NextRequest } from "next/server";

type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const data: UserData = await req.json(); // Mengurai body menjadi JSON

    console.log(data);

    // Validasi data
    if (!data) {
      return NextResponse.json(
        {
          message:
            "All fields are required, including id, first_name, and language_code.",
        },
        { status: 400 }
      );
    }

    // Menggunakan data untuk membuat atau mencari pengguna
    const user = await findOrCreateUserById(Number(data.id), data);

    return NextResponse.json({
      data: user, // Mengembalikan pengguna yang ditemukan atau baru
    });
  } catch (error) {
    console.error("Error in POST handler:", error); // Menambahkan log error dengan detail
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
