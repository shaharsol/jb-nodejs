class User {
    constructor (db) {
        this.db = db;
    };

    async add ({githubId}) {
        await this.db.execute(`
            insert into users(github_id) values(?)
        `,[
            githubId,
        ]);
    };
    
    async findByGithubId ({githubId}) {
        return this.db.execute(`
            select * from users where github_id = ?
        `,[
            githubId,
        ]);    
    };
    
}


module.exports = User;