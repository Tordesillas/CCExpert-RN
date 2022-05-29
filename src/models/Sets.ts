import Hero from './Hero';
import Talent from './Talent';
import Dungeon from './Dungeon';
import Pet from './Pet';
import Archdemon from './Archdemon';
import HeroRoll from './HeroRoll';

export default class Sets {
    static instance: Sets;
    heroes: Array<Hero>;
    dungeons: Array<Dungeon>;
    talents: Array<Talent>;
    pets: Array<Pet>;
    archdemons: Array<Archdemon>;
    heroesRoll: Array<HeroRoll>;

    constructor() {
        this.heroes = [];
        this.dungeons = [];
        this.talents = [];
        this.pets = [];
        this.archdemons = [];
        this.heroesRoll = [];
    }

    static get(): Sets {
        if (!this.instance) {
            this.instance = new Sets();
        }
        return this.instance;
    }

    getHero(heroNameFR: string): Hero {
        return this.heroes.find(hero => hero.nameFR === heroNameFR)!;
    }

    addHero(hero: any) {
        this.heroes.push(new Hero(hero));
    }

    addDungeon(dungeon: any) {
        this.dungeons.push(new Dungeon(dungeon));
    }

    getTalent(talentNameFR: string): Talent {
        return this.talents.find(talent => talent.nameFR === talentNameFR)!;
    }

    addTalent(talent: any) {
        this.talents.push(new Talent(talent));
    }

    getPet(petNameFR: string): Pet {
        return this.pets.find(pet => pet.nameFR === petNameFR)!;
    }

    addPet(pet: any) {
        this.pets.push(new Pet(pet));
    }

    addArchdemon(archdemon: any) {
        this.archdemons.push(new Archdemon(archdemon));
    }

    addHeroRoll(heroRoll: any) {
        this.heroesRoll.push(new HeroRoll(heroRoll));
    }
}