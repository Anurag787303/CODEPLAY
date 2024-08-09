const express = require('express')
const { submit, createProblem, getProblems, getProblem } = require('../controllers/Problem')

const router = express.Router()

router.route("/submit").post(submit)
router.route("/create").post(createProblem)
router.route("/").get(getProblems)
router.route("/:id").get(getProblem)

module.exports = router