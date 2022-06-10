import {LocalizationService, Registry} from '../services';
import {Images} from '../utils';

export default class Insignia {
    nameFR: string;
    nameEN: string;
    descriptionFR: Array<string> = [];
    descriptionEN: Array<string> = [];

    private localizationService: LocalizationService;

    constructor(insignia: any) {
        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.nameFR = insignia.label_fr;
        this.nameEN = insignia.label_en;

        for (let i = 1; i <= 10; i++) {
            if (insignia.hasOwnProperty(`des${i}_fr`)) {
                this.descriptionFR[i] = insignia[`des${i}_fr`];
            }
        }
        for (let i = 1; i <= 10; i++) {
            if (insignia.hasOwnProperty(`des${i}_en`)) {
                this.descriptionEN[i] = insignia[`des${i}_en`];
            }
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

    getDescription(level: number): string {
        switch (this.localizationService.getLanguage()) {
            case 'fr':
                return this.descriptionFR[level];
            default:
                return this.descriptionEN[level];
        }
    }

    getPicture(): number {
        return Images[this.nameEN.toLowerCase().trim().replace(/[ -]/g, '_').replace(/[']/g, '') as keyof typeof Images];
    }

    getMinimumLevel(): number {
        return this.descriptionEN.findIndex(des => !!des);
    }

    getMaximumLevel(): number {
        return 10 - this.descriptionEN.reverse().findIndex(des => !!des);
    }
}