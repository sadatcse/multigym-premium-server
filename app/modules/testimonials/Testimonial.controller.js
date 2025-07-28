import Testimonial from "./Testimonial.model.js";

export async function getAllTestimonials(req, res) {
  try {
    const result = await Testimonial.find();
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTestimonialById(req, res) {
  const id = req.params.id;
  try {
    const result = await Testimonial.findById(id);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createTestimonial(req, res) {
  try {
    const testimonialData = req.body;
    const result = await Testimonial.create(testimonialData);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateTestimonial(req, res) {
  const id = req.params.id;
  const testimonialData = req.body;
  try {
    const result = await Testimonial.findByIdAndUpdate(id, testimonialData, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeTestimonial(req, res) {
  const id = req.params.id;
  try {
    const result = await Testimonial.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Testimonial deleted successfully" });
    } else {
      res.status(404).json({ message: "Testimonial not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
