import { IPerson } from "./IPerson";
import Clinic from "./clinic";

export default class IHousehold {
  blockNum: number;
  inhabitants: IPerson[];

  constructor(blockNum: number, inhabitants: IPerson[]) {
    this.blockNum = blockNum;
    this.inhabitants = inhabitants;
  }

  vaccinatePerson(phn: string, clinic: Clinic) {
    let person = this.inhabitants.find((p) => p.phn === phn && !p.isVaccinated);
    if (person) {
      clinic.waitingList(person);
    }
  }
}
