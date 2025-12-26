import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
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
}, { timestamps: true });

const Contact = model("Contact", contactSchema);

export default Contact;
