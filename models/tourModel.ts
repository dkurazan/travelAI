import { Schema, model, models } from "mongoose";

const tourSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  stops: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

tourSchema.index({ city: 1, country: 1 }, { unique: true });

export const Tour = models.tours || model('tours', tourSchema);