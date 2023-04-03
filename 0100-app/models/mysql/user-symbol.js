class UserSymbol {
    constructor (db) {
        this.db = db;
    };

    async add ({userId, symbol}) {
        await this.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            userId,
            symbol,
        ]);
    };
    
    async findByUserId ({userId}) {
        return this.db.execute(`
            select * from users_symbols where user_id = ?
        `,[
            userId,
        ]);    
    };
    
}


module.exports = UserSymbol;