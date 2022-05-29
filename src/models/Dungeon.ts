export default class Dungeon {
    urlYoutube: string;
    f2p: boolean;
    door: string;
    base: string;

    constructor(dungeon: any) {
        this.urlYoutube = dungeon.url;
        this.f2p = dungeon.F2P_P2W === 0;
        this.door = dungeon.door;
        this.base = dungeon.base;
    }
}