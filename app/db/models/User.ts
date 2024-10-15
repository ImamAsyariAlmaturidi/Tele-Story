import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";

export type UserModel = {
  id: string; // Jika ini adalah ID unik yang Anda kelola, tetap menggunakan string
  first_name: string;
  last_name?: string; // Menambahkan ? jika field ini opsional
  username: string;
};

const DATABASE_NAME = process.env.DATABASE_NAME || "bot_services";
const COLLECTION_USER = "users";

export const getDb = async (): Promise<Db> => {
  const client = await getMongoClientInstance();
  return client.db(DATABASE_NAME);
};

export const findOrCreateUserById = async (
  id: number,
  userData: UserModel // Menggunakan tipe input yang tepat
): Promise<UserModel> => {
  const db = await getDb();

  const existingUser = (await db
    .collection(COLLECTION_USER)
    .findOne({ id })) as UserModel | null;

  if (existingUser) {
    return existingUser;
  }

  const newUser: UserModel = {
    id: userData.id, // Jika id yang dimaksud adalah yang diberikan dalam userData
    first_name: userData.first_name,
    last_name: userData.last_name || "", // Default empty string jika tidak ada
    username: userData.username,
  };

  const result = await db.collection(COLLECTION_USER).insertOne(newUser);

  // Mendapatkan ID yang disisipkan dan mengembalikan objek lengkap
  return {
    ...newUser,
    id: result.insertedId.toString(), // Konversi ObjectId ke string jika perlu
  };
};
