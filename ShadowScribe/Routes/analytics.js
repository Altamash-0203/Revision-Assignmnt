const router = require("express").Router();
const Character = require("../models/characterSchema");

router.get("/top-factions", async (req, res) => {
  let data = await character.aggregate([
    { $match: { deleted: false } },
    { $group: { _id: "$factionId", power: { $sum: "$powerlevel" } } },
    { $sort: { power: -1 } },
  ]);

  res.json(data);
});

module.exports = router;
