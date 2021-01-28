import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class Talent {
    nameFR: string;
    nameEN: string;
    descriptionFR: [string];
    descriptionEN: [string];
    isEnchantment: boolean;

    constructor(talent: Object) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = talent.talent_fr;
        this.nameEN = talent.talent_en;

        this.descriptionFR = [];
        for (let i = 1; i <= 10; i++) {
            if (talent.hasOwnProperty(`des${i}_fr`)) {
                this.descriptionFR[i] = talent[`des${i}_fr`];
            }
        }
        this.descriptionEN = [];
        for (let i = 1; i <= 10; i++) {
            if (talent.hasOwnProperty(`des${i}_en`)) {
                this.descriptionEN[i] = talent[`des${i}_en`];
            }
        }

        this.isEnchantment = talent.enchantment === 1;
    }

    getName(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.nameFR;
            default:
                return this.nameEN;
        }
    }

    getDescription(level: number): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.descriptionFR[level];
            default:
                return this.descriptionEN[level];
        }
    }

    getPicture(): Images {
        return Images[this.nameEN.toLowerCase().trim().replace(/[ -]/g, '_').replace(/[']/g, '')];
    }

    getCrestPicture(): Images {
        return Images[`${this.nameEN.toLowerCase().trim().replace(/[ -]/g, '_').replace(/[']/g, '')}_crest`];
    }

    getMinimumLevel(): number {
        return this.descriptionEN.findIndex(des => !!des);
    }

    getMaximumLevel(): number {
        return 10 - this.descriptionEN.reverse().findIndex(des => !!des);
    }
}