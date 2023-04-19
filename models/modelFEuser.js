const { Schema, model } = require("mongoose")

const Schema = mongoose.Schema

const FEuserSchema = new Schema(
  {
    accountname: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String },
    birthday: { type: Date },
    profilePic: { type: String, default: "/images/profilePic.jpeg" },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
)

let FEuser = mongoose.model("FEuser", FEuserSchema)
module.exports = FEuser
