import { Container } from 'inversify';

class IocContainer {
    private myContainer: Container;
    public constructor () {
        this.myContainer = new Container();

        // this.myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
        // this.myContainer.bind<Weapon>(TYPES.Weapon).to(Katana2);
        // this.myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
    }

    set<T> (className: string, clazz: any): void {
        this.myContainer.bind<T>(className).to(clazz);
    }

    get<T> (type: string): T {
        return this.myContainer.get<T>(type);
    }
}

export const iocContainer = new IocContainer();
