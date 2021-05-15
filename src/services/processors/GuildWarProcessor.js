import Registry from '../registry';
import LocalizationService from '../localizationService';

export default class GuildWarProcessor {
    static printStats(t: any, power: string, score: string): string {
        if (!power || !score || power.length < 4 || score.length < 3) return "";

        power = parseInt(power);
        score = parseInt(score);
        const scoreOnPower = (power === 0) ? 0 : score / power;
        const averagePower = (scoreOnPower < 0.005) ? 0 : Math.round(240 * score - 120000 - 1.5 * power);

        if (averagePower <= 0) {
            return t('guild-war.incorrect-data');
        }

        const formattedPower = Registry.getInstance(LocalizationService.className).formatNumber(averagePower);

        return t('guild-war.simulation-result', {power: formattedPower});
    }
}