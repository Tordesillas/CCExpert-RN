export default class Dungeon {
    constructor(dungeon: Object) {
        this.urlYoutube = dungeon.url;
        this.f2p = dungeon.F2P_P2W === 0;
        this.door = dungeon.door;
        this.base = dungeon.base;
    }
}