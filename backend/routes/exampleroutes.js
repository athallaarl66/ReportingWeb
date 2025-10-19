import express from "express";
const router = express.Router();

// contoh route sederhana
router.get("/users", (req, res) => {
  res.json({ message: "API is working fine!" });
});

export default router;
