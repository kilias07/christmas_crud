const {v4: uuid} = require("uuid");
const {ValidationError} = require("../utils/error");
const {pool} = require("../utils/db");

class ChildRecord {

    constructor(obj) {
        if(!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError("Name must be between 3 and 55 characters");
        }
        this.name = obj.name;
        this.id = obj.id;
        this.giftId = null;
    }

    async insert() {
        if(!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `children` VALUES (:id, :name, :giftId)", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        })
        return this.id
    }
    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `children` ORDER BY `name` ASC");
        return results
    }
    static async listOne(id) {
        const [result] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id", {
            id,
        });
        return result.length === 0 ? null : new ChildRecord(result[0]);
    }
    async update() {
        await pool.execute("UPDATE `children` SET `name` = :name, `giftId` = :giftId WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            giftId: this.giftId
        })
    }
}

module.exports = {
    ChildRecord,
}