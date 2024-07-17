import { ObjectId } from "mongoose";

export type IUser = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type IPublicUser = {
  _id: string;
  name: string;
  email: string;
}

export type GetUserData = {
  id: string
}
