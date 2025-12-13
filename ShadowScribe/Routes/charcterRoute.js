const router = require("express").Router();
const Character = require("../models/characterSchema");

router.post("/", async (req, res) => {
  const c = await Character.create({ ...req.body, createdBy: req.user.id });
  res.json(c);
});

router.put("/:id", async (req, res) => {
  const c = await Character.findById(req.params.id);
  if (req.user.role === "writer" && c.createdBy != req.user.id)
    return res.sendStatus(403);
  res.json(
    await Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
});

router.delete("/:id", async (req, res) => {
  await Character.findByIdAndUpdate(req.params.id, { deleted: true });
  res.sendStatus(204);
});

module.exports = router;
