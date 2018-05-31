import { myContainer } from "./test/inversify.config";
import { TYPES } from "./test/types";
import { Warrior } from "./test/interfaces";

const ninja: Warrior = myContainer.get<Warrior>(TYPES.Warrior);

// true
console.log(ninja.fight());
// true
console.log(ninja.sneak());