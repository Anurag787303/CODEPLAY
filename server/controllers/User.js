const User = require('../models/User')

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const user = await User.findOne({ email }) || await User.findOne({ username })

    if (user) {
        return res.status(400).send({
            message: "User already exists"
        })
    }

    const newUser = new User({
        username,
        email,
        password
    })

    await newUser.save()

    res.status(201).send({
        message: "User created successfully",
        user: newUser
    })
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user || !user.validPassword(password)) {
        return res.status(400).send({
            message: "Invalid email or password"
        })
    }

    res.status(200).send({
        message: "User logged in successfully",
        user
    })
}