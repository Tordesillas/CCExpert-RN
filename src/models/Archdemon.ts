import {LocalizationService, Registry} from '../services';

export default class Archdemon {
    descriptionFR: string;
    descriptionEN: string;
    heroNames: Array<string>;
    talents: Array<string>;
    crests: Array<string>;

    localizationService: LocalizationService;

    constructor(archdemon: any) {
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
                return this.descriptionFR.replace(' + ', '\n');
            default:
                return this.descriptionEN.replace(' + ', '\n');
        }
    }

    getHeroesSuggestion(): Array<{hero: string, talent: string, crest: string}> {
        let suggestion = [];
        for (let i = 0; i <= 5; i++) {
            suggestion.push({hero: this.heroNames[i], talent: this.talents[i], crest: this.crests[i]});
        }
        return suggestion;
    }
}