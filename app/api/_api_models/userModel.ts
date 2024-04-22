import mongoose, { InferSchemaType } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// Define the interface for the User document
interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  avatar: string;
  password: string;
  isVerified: boolean;
  passwordChangedAt: Date;
  encryptedPasswordResetToken: string;
  passwordResetTokenExpires: Date;
  status: string;
  isPasswordCorrect(
    candidatePassword: string,
    userPasswordStoredInDB: string
  ): Promise<boolean>;
  isPasswordChangedAfterJwtIssued(JWTTimestamp: any): boolean;
  createPasswordResetToken(): string;
  [key: string]: any;
}

// Define the enum for user statuses
const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

// Define the enum for user roles
const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

/* =======================================================================
          USERSCHEMA
   ======================================================================= */
const UserSchema = new mongoose.Schema<UserDocument>(
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
      enum: Object.values(UserRole), // Ensure role is one of the enum values
      default: UserRole.USER, // Set default role
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    encryptedPasswordResetToken: String,
    passwordResetTokenExpires: Date,
    status: {
      type: String,
      enum: Object.values(UserStatus), // Ensure status is one of the enum values
      default: UserStatus.ACTIVE, // Set default status
    },
  },
  {
    timestamps: true,
  }
);

/* =======================================================================
          USERSCHEMA TYPE
   ======================================================================= */
// type User = InferSchemaType<typeof UserSchema>;
// /-----------------------------------------------------------------

//--------------------------------------------------------
//--PASSWORD ENCRYPTINNG & REMOVING PASSWORDCONFIRM FIELD----------
//encrpting password and removing the passwordconfirm field in database using bcryptjs package Using document pre-save middleware-
//note that when you're using findAndUpdate() method, the pre-save hook/middleware is not triggered
UserSchema.pre("save", async function (next) {
  //// Only run this function if password field was actually moddified(during password reset and password update) or created new(initial signup)(also it will  not run when other fields like name and emails are modified)
  //if password is not modified then dont encrypt password, move to next middleware
  //only encrpt passowrd and place undefine in passwordConfirm field When a new password is created or when it is updated

  if (!this.isModified("password")) {
    //eg-we dont want to hash password again if we only update name so thats why if the password is not updated along when updating the other fields then skip this middleware and move to next middleware
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
  // const user = this;
  // if (this.isModified("password") || this.isNew) {
  //   bcrypt.genSalt(10, function (saltError: any, salt: any) {
  //     if (saltError) {
  //       return next(saltError.message);
  //     } else {
  //       bcrypt.hash(user.password, salt, function (hashError, hash) {
  //         if (hashError) {
  //           return next(hashError);
  //         }
  //         user.password = hash;
  //         next();
  //       });
  //     }
  //   });
  // }
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
  //encrypted reset toke
  this.encryptedPasswordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //key-crpto ccud

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //adding 10mins exporation time when resetToken is created//then resetToken is valid for 10mins

  // console.log(resetToken, this.encryptedPasswordResetToken);
  return resetToken; //we use this in forgotpassword middleware
};

export default mongoose.models?.users ||
  mongoose.model<UserDocument>("users", UserSchema);
