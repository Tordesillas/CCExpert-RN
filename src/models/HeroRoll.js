import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class HeroRoll {
    constructor(heroRoll: Object) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = heroRoll.name_fr;
        this.nameEN = heroRoll.name_en;
        this.nameDE = heroRoll.name_de;
        this.nameES = heroRoll.name_es;
        this.nameRU = heroRoll.name_ru;

        this.proba = heroRoll.proba;
        this.occurrences = 0;
    }

    getName(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.nameFR;
            default:
                return this.nameEN;
        }
    }

    getPicture(appearance: ?number): Images {
        return Images[`${this.nameEN}${appearance || ''}`.toLowerCase().trim().replace(/[ -]/g, '_')];
    }

    getOccurrencesAndIncr() {
        this.occurrences++;
        return this.occurrences;
    }

    resetOccurrences() {
        this.occurrences = 0;
    }
}