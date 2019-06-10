const express = require("express");
const UUID = require("uuid/v4");
const User = require("../models/users");
const router = express.Router();
const security = require("../utils/encryptor");


/**
 * GET from /api/user 
 * returns a complete user object with finance data if it exists.
 * 
 * This requires authentication through the Authorization header,
 * in the form of username:password or email:password based64-ed.
 * 
 * @param {Module:express.IncomingMessage} request 
 * @param {Module.express.ServerResponse} response 
 * @returns {JSON} response of type { message, user }
 */
async function getFinance(request, response) {
    const authHeader = request.header("Authorization");

    if (!authHeader) 
        return response.status(401).json({ message: "No credentials provided" })

    const auth = Buffer.from(authHeader, 'base64').toString('ascii');
    const split = auth.split(":");

    // TODO: Check if username or password passed in header.

    try {
        const user = await User.findOne({ username: split[0] })
        if (user === null) {
            response.status(404).json({ message: "User does not exist" })
        }
        else if (!user.finance) {
            user.email = "<redacted>";
            response.json({ user, finance: null });
        }
        else {
            // TODO: Decrypt data with password provided
            // TODO: Compare data json in string format + password with stored hash
            response.json({ 
                message: "Initiating super duper decrypting",
                user
            })          
        }
    } catch (err) {
        response.status(500).json({ message: err});
    }
}

/**
 * POST to api/user/new 
 * Creates a new user instance
 * A new users' finance deafults to null.
 * 
 * Returns the created user instance if successfull.
 * 
 * @param {Module:express.IncomingMessage} request 
 * @param {Module.express.ServerResponse} response 
 */
async function newUser(request, response) {
    const body = request.body;

    if (!body.username)
        return response.status(400).json({ message: "Missing username field" });

    if (!body.email)
        return response.status(400).json({ message: "Missing email field" });

    if (!body.password)
        return response.status(400).json({ message: "Missing password field" });


    const uuid = UUID();
    const hasher = security.createHash("sha512")
    const encUuid = security.encrypt(uuid, body.password);

    const passHash = hasher.update(body.password).digest();
    const uuidHash = hasher.update(uuid)

    const user = new User({
        username: body.username,
        email: body.email,
        datahash: passHash,
        uuidHash,
        datakey: encUuid
    });

    try {
        const createdUser = await user.save();
        response.status(201).json({
            username: createdUser.username,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            lastActive: createdUser.lastActive,
            datakey: uuid,
            finance: null
        });
    } catch (err) {
        if (err.code === 11000)
            response.status(400).json({ message: "Account already exists" });
        else {
            response.status(400).json({ message: err });
        }
    }
}

/**
 * PATCH to /api/user 
 * Edits the email of a user, 
 * This requires authentication through the Authorization header,
 * in the form of username:password or email:password based64-ed.
 * 
 * Alternatively if no Authorization header is provided,
 * but instead a body of type json { email } or { username },
 * then an email will be sent to the related account with a password reset link.
 * 
 * @param {Module:express.IncomingMessage} request 
 * @param {Module.express.ServerResponse} response 
 * @returns {JSON} response of type { message, user? }
 */
async function editEmail(request, response) {
    const authHeader = request.header("Authorization");

    if (!authHeader) 
        return response.status(401).json({ message: "No credentials provided" })

    const auth = Buffer.from(authHeader, 'base64').toString('ascii');
    const split = auth.split(":");

    // TODO if no auth was provided check body for username/email 
    // and send reset link to linked email.

    try {
        const user = await User.findOne({ username: split[0] })
        // TODO: Compare data json in string + password with stored hash
        // to authenticate before editing email.
        // TODO: Edit email
    } catch (error) {

    }
}

/**
 * DELETE request to /api/user 
 * Removes a user from the system.
 * This requires authentication through the Authorization header,
 * in the form of username:password or email:password based64-ed.
 * 
 * @param {Module:express.IncomingMessage} request 
 * @param {Module.express.ServerResponse} response 
 * @returns {JSON} response of type { message, user }
 */
async function deleteUser(request, response) {
    const authHeader = request.header("Authorization");

    if (!authHeader) 
        return response.status(401).json({ message: "No credentials provided" })

    const auth = Buffer.from(authHeader, 'base64').toString('ascii');
    const split = auth.split(":");

    // TODO: check if username or email before looking up user to delete.
    // TODO: Check if data json in string + password matches stored hash
    // to verify user.

    try {
        const user = await User.findOne({ username: split[0] })
        console.log(user);
        
        if (user !== null) {
            await User.deleteOne(user);
            response.json({ message: "ok!" })
        }
    } catch (error) {

    }
}

async function authorizationMiddleware(request, response, next) {
    const base64Auth = (request.header("Authorization") || "").split(" ")[1] || "";
    const strAuth = new Buffer(base64Auth, "base64").toString();
    
    const [_, login, password] = strAuth.match(/(.*?):(.*)/) || []

    // Todo implement auth here.

    try {
        const user = await User.findOne({ username: login });

        if (user !== null) {
            return next();
        }
    } catch (error) {

    }
}

router.use("/", authorizationMiddleware)
router.get("/", getFinance);
router.patch("/", editEmail),
router.delete("/", deleteUser);
router.post("/new", newUser);

module.exports = router;
