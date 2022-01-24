const {v4: uuid} = require("uuid");
const {ValidationError} = require("../utils/error");
const {pool} = require("../utils/db");

class GiftRecord {
    constructor(obj) {
        if(!obj.name || obj.name.length < 3 || obj.name.length > 55) {
            throw new ValidationError("Name must be between 3 and 55 characters");
        }
        if(!obj.count || obj.count.length < 0 || obj.count.length > 99999) {
            throw new ValidationError("Count must be between 0 and 99999 characters");
        }
        this.name = obj.name;
        this.count = obj.count;
        this.id = obj.id;
    }
    async insert() {
        if(!this.id) {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `gifts` VALUES (:id, :name, :count)', {
            id: this.id,
            name: this.name,
            count: this.count,
        })
        return this.id
    }

    static async listAll() {
        const [result] = await pool.execute("SELECT * FROM `gifts`");
        return result
    }
    static async listOne(id) {
        const [result] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id", {
            id,
        });
        return result.length === 0 ? null : result;
    }
}

module.exports = {
    GiftRecord,
}