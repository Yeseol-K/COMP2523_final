import { IReport } from "./IReport";
import Clinic from "./clinic";

export default class SimpleReport implements IReport {
  clinics: Clinic[];

  constructor(clinic: Clinic[]) {
    this.clinics = clinic;
  }

  printDetails = () => {
    console.log("simple report:");
    this.clinics.forEach((clinic) => {
      console.log(`${clinic.name} : ${clinic.queue.size()} people in line`);
    });
  };
}
