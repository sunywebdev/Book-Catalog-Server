import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModel } from './user.interface';
import httpStatus from 'http-status';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    reading: [
      {
        book: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        stage: {
          type: String,
          required: true,
          enum: ['Reading', 'Reading Soon', 'Finished'],
        },
      },
    ],
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
): Promise<Pick<IUser, 'email' | 'password'> | null> {
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
