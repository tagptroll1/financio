const crypto = require("crypto");

class Security {
    constructor() {
        this.encryptionAlgo = "aes-256-ctr";
    }

    createHash(type) {
        return crypto.createHash(type);
    }

    encrypt(str, key) {
        const cipher = crypto.createCipher(this.encryptionAlgo, key);
        let crypted = cipher.update(str, "utf8", "hex");
        crypted += cipher.final("hex");
        return crypted;
    }

    decrypt(str, key) {
        const decipher = crypto.createDecipher(this.encryptionAlgo, key);
        let dec = decipher.update(str, "hex", "utf8");
        dec += decipher.final("utf8");
        return dec;
    }
}

module.exports = new Security();