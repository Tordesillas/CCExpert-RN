export default class Dungeon {
    urlYoutube: string;
    f2p: boolean;
    door: number;
    base: number;

    constructor(dungeon: any) {
        this.urlYoutube = dungeon.url;
        this.f2p = dungeon.F2P_P2W === 0;
        this.door = parseInt(dungeon.door);
        this.base = parseInt(dungeon.base);
    }
}