class UserSymbol {
    constrcutor (pool) {
        this.pool = pool;
    }

    add (userId, symbol) {
        this.db.execute(`
            insert into users_symbols (user_id, symbol) values (?, ?)
        `, [
            userId, symbol
        ]);
    }
}

module.exports = UserSymbol;