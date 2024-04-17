import Clinic from "./clinic";
import { IReport } from "./IReport";

export class ComplexReport implements IReport {
  clinics: Clinic[];

  constructor(clinics: Clinic[]) {
    this.clinics = clinics;
  }

  printDetails() {
    console.log("complex report:");
    this.clinics.forEach((clinic) => {
      console.log(` ${clinic.name} : average wait time ${clinic.getAvgWaitTime()} mins, ${clinic.queue.size()} people in line`);
    });
  }
}
