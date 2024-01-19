const express = require("express");
const router = express.Router();

const getCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str;

    do {
        str = '';

        for (let i = 0; i < 6; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (code.includes(str));

    return str;
};

router.get("/create", (_req, res) => {
    const newCode = getCode();
    code.push(newCode);
    console.log(code);
    res.status(200).send(newCode);
});

module.exports = router;
