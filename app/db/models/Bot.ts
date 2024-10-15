import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";

export type UserModel = {
  _id: ObjectId;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME || "bot_services";
const COLLECTION_BOT = "bot";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getAllBotByUserId = async (id: string) => {
  const db = await getDb();
  const bot = await db.collection(COLLECTION_BOT);

  const data = bot
    .find({
      id: id,
    })
    .toArray();
  return data;
};

export const createBot = async (formData: object) => {
  const db = await getDb();

  const bot = await db.collection(COLLECTION_BOT);
  const createBot = bot.insertOne(formData);
  return createBot;
};
