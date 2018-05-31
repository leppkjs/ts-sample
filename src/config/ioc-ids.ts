/**
 * IOC 객체 식별자
 */
const IOC_IDS = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

export { IOC_IDS };