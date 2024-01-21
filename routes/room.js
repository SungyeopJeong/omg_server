const express = require("express");
const router = express.Router();

const getCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str;

    do {
        str = '';

        for (let i = 0; i < 6; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (room.has(str));

    return str;
};

router.get("/create", (_req, res) => {
    const newCode = getCode();
    room.set(newCode, []);
    res.status(200).send(newCode);
});

module.exports = router;
