class UserSymbol {
    constructor (pool) {
        this.pool = pool;
    }

    add (userId, symbol) {
        this.pool.execute(`
            insert into users_symbols (user_id, symbol) values (?, ?)
        `, [
            userId, symbol
        ]);
    }

    getSymbols() {
        return this.pool.execute(`
            select distinct symbol from users_symbols
        `);
    }

    async findByUserId ({userId}) {
        return this.pool.execute(`
            select * from users_symbols where user_id = ?
        `,[
            userId,
        ]);    
    };
}

module.exports = UserSymbol;