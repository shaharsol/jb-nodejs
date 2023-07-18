class User {

    constructor (pool) {
        this.pool = pool;
    }

    create ({githubId}) {
        return this.pool.execute(`
            insert into users (github_id)
            values (?)
        `, [
            githubId,
        ]);
    }

    getByGithubId(githubId) {
        return this.pool.execute(`
            select * from users
            where github_id = ?
        `, [
            githubId,
        ]);

    }

    retrieve(id) {
        return this.pool.execute(`
        select * from users
        where id = ?
        `, [
            id,
        ]);
    }

    update({id, userId, symbol}) {

    }

    delete({id}) {
        
    }

}

module.exports = User;