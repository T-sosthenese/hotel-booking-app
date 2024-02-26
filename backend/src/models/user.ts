import mongoose, { Document, Schema, Types } from "mongoose";

export type UserType = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

interface UserDocument extends Omit<UserType, "_id">, Document {
  _id: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
