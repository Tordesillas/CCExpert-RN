import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class Pet {
    nameFR: string;
    nameEN: string;
    nameDE: string;
    nameES: string;
    nameRU: string;
    descriptionFR: [string];
    descriptionEN: [string];
    modes: string;

    constructor(pet: Object) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = pet.pet_fr;
        this.nameEN = pet.pet_en;
        this.nameDE = pet.pet_de;
        this.nameES = pet.pet_es;
        this.nameRU = pet.pet_ru;

        this.descriptionFR = [];
        for (let i = 1; i <= 10; i++) {
            if (pet.hasOwnProperty(`${i}_fr`)) {
                this.descriptionFR[i] = pet[`${i}_fr`];
            }
        }
        this.descriptionEN = [];
        for (let i = 1; i <= 10; i++) {
            if (pet.hasOwnProperty(`${i}_en`)) {
                this.descriptionEN[i] = pet[`${i}_en`];
            }
        }

        this.modes = pet.modes;
    }

    getDescription(level: number): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.descriptionFR[level];
            default:
                return this.descriptionEN[level];
        }
    }

    getName(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.nameFR;
            default:
                return this.nameEN;
        }
    }

    getPicture(): Images {
        return Images[this.nameEN.toLowerCase().trim().replace(/[ -]/g, '_').replace(/[()]/g, '')];
    }

    isRecommendedForThisMode(mode: number): boolean {
        return this.modes[mode] === "1";
    }
}