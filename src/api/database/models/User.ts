import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
  userId: string,
  password: string,

  comparePassword: (password: string, cb: (err: any, isMatch: any) => {}) => void
};

const userSchema = new mongoose.Schema({
  userId: String,
  password: String
}, { timestamps: true });

/**
 * User hash middleware
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(password, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);
export default User;
