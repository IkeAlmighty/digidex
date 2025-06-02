import { Schema, model } from "mongoose";

// Define the schema for the User document
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phone: {
    type: Number,
    match: [/^\+?[0-9\-().\s]{7,20}$/, "Invalid phone number"],
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
  notes: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.every((tag) => /^[\w-]+$/.test(tag));
      },
      message: "Tags must be alphanumeric with optional dashes or underscores",
    },
  },
});

const Contact = model("Contact", contactSchema);

export default Contact;
