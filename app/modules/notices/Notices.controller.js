import Notices from "./Notices.model.js";

export async function getAllNotices(req, res) {
  try {
    const result = await Notices.find();
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getNoticeById(req, res) {
  const id = req.params.id;
  try {
    const result = await Notices.findById(id);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createNotice(req, res) {
  try {
    const noticeData = req.body;
    const result = await Notices.create(noticeData);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeNotice(req, res) {
  const id = req.params.id;
  try {
    const result = await Notices.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Notice deleted successfully" });
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateNotice(req, res) {
  const id = req.params.id;
  const noticeData = req.body;
  try {
    const result = await Notices.findByIdAndUpdate(id, noticeData, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
