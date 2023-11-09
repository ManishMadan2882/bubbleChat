import userModel from "../database/Models/userModel";
import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { generateFromEmail, generateUsername } from "unique-username-generator";
import jwt, { decode, sign } from 'jsonwebtoken'
//register new users
async function registerUser(req: Request, res: Response,next:NextFunction) {
    const { email, password } = req.body;
    //generates a random username from the email id
    const username = generateFromEmail(
        email, 3
    );
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ success: false, msg: 'That user already exists!' });
    }
    const salt: string = genSaltSync(10)
    const encryptedPassword: string = hashSync(password, salt)
    const newUser = new userModel({
        email,
        username,
        password: encryptedPassword
    })
    newUser.save()
        .then(() => next())
        .catch(err => res.status(400).json({ msg: 'something went wrong', err, success: false }))
}
//create session for existing users
async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const userData = await userModel.findOne({
        email
    });
    if (userData === null)
        return res.json({
            msg: "user does not exist", //user not found
            success: false
        });
    if (compareSync(password, userData.password)) {
        //create a json token
        const token = sign({
            email: email,
            userId: userData._id,
            time: Date.now()
        },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "30d"
            });
        return res.json({
            success: true,
            msg: 'authenticated',
            username: userData.username,
            userId: userData._id,
            imgUrl: userData.profilePicture,
            token: token //Needs to be stored in client cookies as session-token
        });
    }
    else
        res.json({
            success: false,
            msg: 'authentication failed' //invalid credentials - Unauthorized
        });
}
//identifies the current user
function getUser(req: Request, res: Response) {
    
    const { userId } = req.user;

    userModel.findById(userId)
        .then((data) => {
            res.status(200).json({
                username: data?.username,
                userId,
                email:data?.email,
                imgUrl:data?.profilePicture
            })
        })
        .catch(error => res.sendStatus(404))
}
export {
    registerUser,
    loginUser,
    getUser
};