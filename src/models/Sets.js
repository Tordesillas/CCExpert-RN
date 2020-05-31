import Hero from './Hero';

export default class Sets {
    static instance: Sets;
    heroes: [Hero];

    constructor() {
        this.heroes = [];
    }

    static get(): Sets {
        if (!this.instance) {
            this.instance = new Sets();
        }
        return this.instance;
    }

    addHero(hero: Object) {
        this.heroes.push(new Hero(hero));
    }
}