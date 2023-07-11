class UserSymbol {

    constructor (pool) {
        this.pool = pool;
    }

    create ({userId, symbol}) {
        return this.pool.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `, [
            userId,
            symbol,
        ]);
    }

    getForUser({userId}) {
        return this.pool.execute(`
            select * from users_symbols
            where user_id = ?
        `, [
            userId,
        ]);

    }

    retrieve({id}) {

    }

    update({id, userId, symbol}) {

    }

    delete({id}) {
        
    }
}

module.exports = UserSymbol;