/**
 * Created by pengwei on 3/17/17.
 */

'use strict';
const DEFAULT_AVATAR = 'riceball';
class Player{
    constructor(name, avatar){
        this.name = name;
        this.avatar = avatar || DEFAULT_AVATAR;
    }
}

module.exports = Player;