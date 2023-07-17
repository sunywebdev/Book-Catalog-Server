import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModel } from './user.interface';
import httpStatus from 'http-status';
import { levels, roles } from './user.constant';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: roles,
    },
    level: {
      type: Number,
      required: true,
      enum: levels,
    },
    company: {
      type: String,
      required: false,
    },
    needChangePassword: {
      type: Boolean,
      required: true,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// is user exist
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<
  IUser,
  'email' | 'password' | 'needChangePassword' | 'role'
> | null> {
  return await User.findOne(
    { email: email },
    { email: 1, password: 1, needChangePassword: 1, role: 1 }
  );
};

// is password match
userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// pre save hook
userSchema.pre('save', async function (next) {
  // hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  // check email exist
  const isExist = await User.findOne({ email: this.email });
  if (isExist) throw new ApiError(httpStatus.CONFLICT, 'Email already exist');
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
