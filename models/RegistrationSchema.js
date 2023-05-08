const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  team: {
    teamName: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    slot: { type: String, enum: ["Slot 1", "Slot 2"] },
    emailSent: { type: Boolean, default: false },
    attendance: { type: Boolean, default: false },
  },
  members: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      year: { type: String, required: true },
      branch: { type: String, required: true },
      gender: { type: String, required: true },
      role: { type: String, enum: ["member", "leader"], required: true },
    },
  ],
  payment: {
    method: { type: String, enum: ["online", "offline"], required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    totalAmount: Number,
    // transactionID: String
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
