import Trainers from "./Trainers.model.js";

export async function getAllTrainers(req, res) {
  try {
    const result = await Trainers.find();
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTrainerById(req, res) {
  const id = req.params.id;
  try {
    const result = await Trainers.findById(id);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createTrainer(req, res) {
  try {
    const trainerData = req.body;
    const result = await Trainers.create(trainerData);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeTrainer(req, res) {
  const id = req.params.id;
  try {
    const result = await Trainers.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Trainer deleted successfully" });
    } else {
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateTrainer(req, res) {
  const id = req.params.id;
  const trainerData = req.body;
  try {
    const result = await Trainers.findByIdAndUpdate(id, trainerData, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
