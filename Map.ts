import fs from "fs";
import path from "path";
import { IPerson } from "./IPerson";
import Clinic from "./clinic";
import Queue from "./queue";
import Household from "./household";

export default class Map {
  private _mapData: any;
  private clinics: Clinic[] = [];
  private households: Household[] = [];

  constructor(mapData: string) {
    this._mapData = mapData;
    this.readfile();
  }

  private readfile() {
    const cities = Object.keys(this._mapData.city);
    cities.forEach((city) => {
      const cityData = this._mapData.city[city];
      cityData.clinics.forEach((clinicData: any) => {
        const clinic = new Clinic(clinicData.name, clinicData.blockNum, clinicData.staff);
        this.clinics.push(clinic);
      });
      cityData.households.forEach((householdData: any) => {
        const household = new Household(householdData.blockNum, householdData.inhabitants);
        this.households.push(household);
      });
    });
  }

  getClinics(): Clinic[] {
    return this.clinics;
  }

  printMap() {
    const cities = Object.keys(this._mapData.city);
    cities.forEach((city) => {
      const cityData = this._mapData.city[city];
      const map: string[] = Array(5).fill("x");
      cityData.households.forEach((household: any) => {
        const allVaccinated = household.inhabitants.every((person: any) => person.isVaccinated);
        map[household.blockNum] = allVaccinated ? "F" : "H";
      });
      cityData.clinics.forEach((clinic: any) => {
        map[clinic.blockNum] = "C";
      });
      console.log(map.join(",") + ` // ${city}`);
    });
  }

  registerForShots(currentIntake: number) {
    this.households.forEach((household) => {
      household.inhabitants.forEach((person) => {
        if (!person.isVaccinated && person.age >= currentIntake) {
          const closestClinic = this.findClosestClinic(household.blockNum);
          household.vaccinatePerson(person.phn, closestClinic);
        }
      });
    });
  }
  private findClosestClinic(blockNum: number): Clinic {
    return this.clinics.reduce((a, b) => (Math.abs(b.blockNum - blockNum) < Math.abs(a.blockNum - blockNum) ? a : b));
  }
}
