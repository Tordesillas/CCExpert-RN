import SQLite from 'react-native-sqlite-storage';
import Sets from './Sets';

export default class Database {
    static instance: Database;

    async initDB() {
        SQLite.enablePromise(true);

        this.db = await SQLite.openDatabase({name: 'ccexpert_database.db', createFromLocation: 1, location: 'Library'});

        await this.getHeroes();
    }

    static get(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    async getHeroes() {
        const [res] = await this.db.executeSql('SELECT * from heroes');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addHero(res.rows.item(i));
        }
    }
}