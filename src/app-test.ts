import { iocContainer } from './test/inversify.config';
import { ThrowableWeapon, Warrior, Weapon } from './test/interfaces';
import { Katana, Katana2, Ninja, Shuriken } from './test/entities';

class Main {
    private ninja: Warrior;

    constructor () {
        // 등록~~!
        iocContainer.set<Warrior>('Warrior', Ninja);
        iocContainer.set<Weapon>('Weapon', Katana);
        iocContainer.set<Weapon>('Weapon2', Katana2);
        iocContainer.set<ThrowableWeapon>('ThrowableWeapon', Shuriken);
    }

    test () {
        this.ninja = iocContainer.get<Warrior>('Warrior');

        console.log(this.ninja.fight());
        console.log(this.ninja.fight2());
        console.log(this.ninja.sneak());
    }
}

new Main().test();
