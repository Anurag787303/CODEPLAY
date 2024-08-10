const Problem = require('../models/Problem')
const { randomBytes } = require('crypto')
const { sendMessage } = require('../utils/utils')

exports.submit = async (req, res) => {
    let data = {
        src: req.body.src,
        input: req.body.input,
        lang: req.body.lang,
        timeOut: req.body.timeOut,
        folder: randomBytes(10).toString('hex')
    }

    await sendMessage(data)

    res.status(200).send({
        message: "Code submitted successfully",
    })
}

exports.createProblem = async (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let testcases = req.body.testcases

    const problem = new Problem({
        title,
        description,
        testcases
    })

    await problem.save()

    res.status(200).send({
        message: "Problem created successfully"
    })
}

exports.getProblem = async (req, res) => {
    const id = req.params.id

    const problem = await Problem.findById(id)

    res.status(200).send({
        message: "Problem fetched successfully",
        problem: problem
    })
}

exports.getProblems = async (req, res) => {
    const problems = await Problem.find()

    res.status(200).send({
        message: "Problems fetched successfully",
        problems: problems
    })
}