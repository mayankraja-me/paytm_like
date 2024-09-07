const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require('jsonwebtoken')
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const body = req.body;

    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username
    });

    if (existingUser) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({ 
            msg: "Error while logging in"
        })
    }

    const user = User.findOne({
        username: body.username,
        password: body.password
    })
    const userId = user._id;
    if(user) {
        const token = jwt.sign({userId}, JWT_SECRET);
        res.json({
            msg: "Successfully signed in",
            token: token
        })
    }


})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId },  { $set: req.body} );

    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $and: [
          {
            $or: [
              { firstName: { $regex: filter, $options: 'i' } },
              { lastName: { $regex: filter, $options: 'i' } },
            ],
          },
          {
            _id: { $ne: req.userId },
          },
        ],
      });
    
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;