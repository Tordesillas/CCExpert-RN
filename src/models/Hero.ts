import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class Hero {
    nameFR: string;
    nameEN: string;
    nameDE: string;
    nameES: string;
    nameRU: string;
    id: number;
    talentGWAttack: string;
    crestGWAttack: string;
    talentGWDefense: string;
    crestGWDefense: string;
    talentDungeon: string;
    crestDungeon: string;
    pet: string;
    enchantments: Array<string>;

    localizationService: LocalizationService;

    constructor(hero: {ecu_donjon: string, ecu_gdg_attaque: string, ecu_gdg_defense: string, enchantement1: string, enchantement2: string, enchantement3: string, id: number, name_de: string, name_en: string, name_es: string, name_fr: string, name_ru: string, pet: string, talent_donjon: string, talent_gdg_attaque: string, talent_gdg_defense: string}) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = hero.name_fr;
        this.nameEN = hero.name_en;
        this.nameDE = hero.name_de;
        this.nameES = hero.name_es;
        this.nameRU = hero.name_ru;

        this.id = hero.id;

        this.talentGWAttack = hero.talent_gdg_attaque;
        this.crestGWAttack = hero.ecu_gdg_attaque;
        this.talentGWDefense = hero.talent_gdg_defense;
        this.crestGWDefense = hero.ecu_gdg_defense;
        this.talentDungeon = hero.talent_donjon;
        this.crestDungeon = hero.ecu_donjon;

        this.pet = hero.pet;
        this.enchantments = [hero.enchantement1, hero.enchantement2, hero.enchantement3];
    }

    getName(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.nameFR;
            default:
                return this.nameEN;
        }
    }

    getPicture(appearance?: number): number {
        return Images[`${this.nameEN}${appearance || ''}`.toLowerCase().trim().replace(/[ -]/g, '_') as keyof typeof Images];
    }
}
