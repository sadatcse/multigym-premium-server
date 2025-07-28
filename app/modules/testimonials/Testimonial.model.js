import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TestimonialSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  comment: {
    type: String,
    required: [true, "Please add a comment"],
  },
  image: {
    type: String,
    required: [true, "Please add an image URL"],
  },
});

const Testimonial = model("testimonial", TestimonialSchema);

export default Testimonial;
