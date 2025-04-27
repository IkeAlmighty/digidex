import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    startTime: {
      type: Schema.Types.Date,
      required: true,
    },
    endTime: {
      type: Schema.Types.Date,
      required: true,
    },
    location: {
      type: Schema.Types.String,
      required: true,
    },
    imageKey: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    adPaid: {
      type: Schema.Types.Boolean,
      default: false,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Event = model("Event", eventSchema);

export default Event;
