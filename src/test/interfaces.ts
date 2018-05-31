export interface IService {
}

export interface Warrior extends IService {
    fight(): string;
    fight2(): string;
    sneak(): string;
}

export interface Weapon extends IService {
    hit(): string;
}

export interface ThrowableWeapon extends IService {
    throw(): string;
}