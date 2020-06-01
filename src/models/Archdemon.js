import {LocalizationService, Registry} from '../services';

export default class Archdemon {
    constructor(archdemon: Object) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.descriptionFR = archdemon.description_fr;
        this.descriptionEN = archdemon.description_en;

        this.heroNames = [];
        for (let i = 1; i <= 6; i++) {
            this.heroNames.push(archdemon[`hero${i}`]);
        }
        this.talents = [];
        for (let i = 1; i <= 6; i++) {
            this.talents.push(archdemon[`talent${i}`]);
        }
        this.crests = [];
        for (let i = 1; i <= 6; i++) {
            this.crests.push(archdemon[`crest${i}`]);
        }
    }

    getDescription(): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.descriptionFR;
            default:
                return this.descriptionEN;
        }
    }
}