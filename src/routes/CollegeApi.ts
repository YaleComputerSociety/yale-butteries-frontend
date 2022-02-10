import express from "express"
import { getAllColleges, getCollege } from "src/controllers/Colleges"

const router = express.Router()

router.get("/", getAllColleges)
router.get("/:collegeId", getCollege)