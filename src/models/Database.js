import SQLite from 'react-native-sqlite-storage';
import Sets from './Sets';

export default class Database {
    static instance: Database;

    async initDB() {
        SQLite.enablePromise(true);

        this.db = await SQLite.openDatabase({name: 'ccexpert_database.db', createFromLocation: 1, location: 'Library'});

        await this.loadHeroes();
        await this.loadDungeons();
        await this.loadTalents();
        await this.loadPets();
        await this.loadArchdemons();
        await this.loadHeroesRoll();
    }

    static get(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    async loadHeroes() {
        const [res] = await this.db.executeSql('SELECT * from heroes');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addHero(res.rows.item(i));
        }
    }

    async loadDungeons() {
        const [res] = await this.db.executeSql('SELECT * from Dungeons');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addDungeon(res.rows.item(i));
        }
    }

    async loadTalents() {
        const [res] = await this.db.executeSql('SELECT * from talents');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addTalent(res.rows.item(i));
        }
    }

    async loadPets() {
        const [res] = await this.db.executeSql('SELECT * from pets');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addPet(res.rows.item(i));
        }
    }

    async loadArchdemons() {
        const [res] = await this.db.executeSql('SELECT * from archdemons');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addArchdemon(res.rows.item(i));
        }
    }

    async loadHeroesRoll() {
        const [res] = await this.db.executeSql('SELECT * from heroes_roll');
        const {length} = res.rows;
        for (let i = 0; i < length; i++) {
            Sets.get().addHeroRoll(res.rows.item(i));
        }
    }
}