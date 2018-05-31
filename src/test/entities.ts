import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces"
import { TYPES } from "./types";

@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Katana2 implements Weapon {
    public hit() {
        return "cut!!!!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _katana2: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
        @inject("Weapon") katana: Weapon,
        @inject("Weapon2") katana2: Weapon,
        @inject("ThrowableWeapon") shuriken: ThrowableWeapon
    ) {
        this._katana = katana;
        this._katana2 = katana2;
        this._shuriken = shuriken;
    }

    public fight() {
        return this._katana.hit();
    }
    public fight2() {
        return this._katana2.hit();
    }
    public sneak() {
        return this._shuriken.throw();
    }

}

export { Ninja, Katana, Katana2, Shuriken };