import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    events: {
      type: [Schema.Types.ObjectId],
      ref: "Event",
      default: [],
    },
    subscribers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    value: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Tag = model("Tag", tagSchema);

export default Tag;
