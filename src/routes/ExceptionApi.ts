import express from "express"
import { createExceptionDate, getAllExceptionDates, getExceptionDate, updateExceptionDate } from "src/controllers/Exceptions"

const router = express.Router()

router.get("/", getAllExceptionDates)
router.get("/:exceptionDateId", getExceptionDate)
router.post("/", createExceptionDate)
router.put("/", updateExceptionDate)