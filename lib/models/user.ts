import { CallbackError, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxlength: [50, "name must contain less than 50 characters"],
      minlength: [2, "name must contain more than 2 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: any) {
          // Regular expression for email validation
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
        message: "Please enter a valid email address",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "defaultAvatar.jpg",
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [8, "password must contain atleast 8 characters"],
      select: false,
    },
    passwordChangedAt: Date, //  date when password is changed/updated
    encryptedPasswordResetToken: String,
    passwordResetTokenExpires: Date,
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
// /-----------------------------------------------------------------

//--------------------------------------------------------
//--PASSWORD ENCRYPTINNG & REMOVING PASSWORDCONFIRM FIELD----------
//encrpting password and removing the passwordconfirm field in database using bcryptjs package Using document pre-save middleware-
//note that when you're using findAndUpdate() method, the pre-save hook/middleware is not triggered
UserSchema.pre("save", async function (next) {
  //// Only run this function if password field was actually moddified(during password reset and password update) or created new(initial signup)(also it will  not run when other fields like name and emails are modified)
  //if password is not modified then dont encrypt password, move to next middleware
  //only encrpt passowrd and place undefine in passwordConfirm field When a new password is created or when it is updated
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError: any, salt: any) {
      if (saltError) {
        return next(saltError.message);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  }
});
//-----------------------------------------------------------------

//-----------------------------------------------------------------
//creating a common document method(also called as instance method) on all the documents of user collection-so that we can access isPasswordCorrect method whenever we get any user document
UserSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string,
  userPasswordStoredInDB: string
) {
  return await bcrypt.compare(candidatePassword, userPasswordStoredInDB); //comparing un encrypted passowrd(candidate password) with encrpted password-in this bcrypt automatically encrypts candidatepassword and compares it with userpassword
};
//-----------------------------------------------------------------

//-----------------------------------------------------------------
UserSchema.methods.isPasswordChangedAfterJwtIssued = function (
  JWTTimestamp: any
) {
  //every common document method(also called as instance method) has access to 'this' which gives the current document in that route
  if (this.passwordChangedAt) {
    const passwordChangedAtInSec = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(), // Convert to string
      10
    ); //converting date string into integer seconds ,bcz JWTTimestamp is always in seconds--parseInt(value,baseValue)
    // console.log(passwordChangedAtInSec, JWTTimestamp);
    //if date value is bigger then it means it is more recent date
    //here true means password is changed ,false meeans not changed
    return JWTTimestamp < passwordChangedAtInSec; //here if the passwordChangedAtInSec is bigger than  JWTTimestamp-means passwordChangedAtInSec is more recent date than JWTTimestamp -which means password is changed but token is still old one (no token generated for new password) so we need to login again//if the passwordChangedAtInSec is smaller than  JWTTimestamp-means passwordChangedAtInSec is more older date than JWTTimestamp -which means no new password is changed or created
  }
  //by default we return false
  //Here false means password is not changed after jwt is created
  return false;
};
//--------------------------------------------------------

//--------------------------------------------------------
//creating reset token - we store encrypted resetToken inside the database and send plain resetToken to user's email while resetting password we again encrpt users plain resetToken with the already storen encrpted resetToken
UserSchema.methods.createPasswordResetToken = function () {
  //plain reset token
  const resetToken = crypto.randomBytes(32).toString("hex"); //creating 32 characters long random token//key-crpto crt
  //encrypted reset token
  this.encryptedPasswordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //key-crpto ccud

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //adding 10mins exporation time when resetToken is created//then resetToken is valid for 10mins

  // console.log(resetToken, this.encryptedPasswordResetToken);
  return resetToken; //we use this in forgotpassword middleware
};
const User = models.User || model("User", UserSchema);

export default User;
