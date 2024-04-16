import fs from "fs/promises";

export class Map {
  private _mapData: any;

  constructor(mapData: any) {
    this._mapData = mapData;
    this.readJson;
  }

  async readJson() {
    const data = await fs.readFile("data.json", "utf-8");
    return new Map(data);
  }

  printMap() {
    const cities = Object.keys(this._mapData.city);
    const householdsBlock = Object.keys(this._mapData.households);

    for (let i = 0; i < householdsBlock.length; i++) {
      const row = cities.map((city) => {
        const cityData = this._mapData.city[city];
        const household = cityData.household[i] || null;
        const clinics = cityData.clinics.find((clinic: any) => clinic.blockNum === i) || null;

        if (household) {
          const vaccinated = household.inhabitants;
          vaccinated.find((person: any) => person.isVaccinated === true);
          return "F";
        } else if (household) {
          const vaccinated = household.inhabitants;
          vaccinated.find((person: any) => person.isVaccinated === false);
          return "H";
        } else if (clinics) {
          return "C";
        } else {
          return "X";
        }
      });
      console.log(row.join(","));
    }
  }

  registerForShots(currentIntake: number) {
    const cities = Object.keys(this._mapData.city);
    const households = Object.keys(this._mapData.households);

    cities.forEach((city) => {
      const cityData = this._mapData.city[city];

      cityData.household.forEach((persons: any) => {
        persons.inhabitants.forEach((person: any) => {
          if (!person.isVaccinated && person.age >= currentIntake) {
            const nearestClinic = cityData.clinics.reduce((clinic: any, house: any) => {
              clinic.blockNum > house.blockNum ? house : clinic;
            });
            //가까운 병원 대기에 넣기?? -> 백신 맞음 -> 대기줄에 뺴기?
            nearestClinic.queue.enqueue(person);
            person.isVaccinated = true;
            nearestClinic.queue.dequeue(person);

            const allVaccinated = persons.inhabitants.map((person: any) => person.isVaccinated);
            if (allVaccinated) {
              persons.isVaccinated = "F";
            }
          }
        });
      });
    });
  }
}

interface IReport {
  printDetails(): void;
}

//name of clinic and lineup
export class SimpleReport implements IReport {
  constructor(private map: Map) {}

  printDetails(): void {
    const cities = Object.keys(this.map._mapData.city);
    cities.forEach((city) => {
      const cityData = this.map._mapData.city[city];
      cityData.clinics.forEach((clinic: any) => {
        console.log(`${clinic.queue.size()} people lineup in ${clinic.name}`);
      });
    });
  }
}

//avr wait time and clinic name(lineup)
export class ComplexReport implements IReport {
  constructor(private map: Map) {}

  printDetails(): void {
    const cities = Object.keys(this.map._mapData.city);
    cities.forEach((city) => {
      const cityData = this.map._mapData.city[city];
      cityData.clinics.forEach((clinic: any) => {
        const waitTime = clinic.queue.size() * 15;
        console.log(`Average Wait Time at ${clinic.name}: ${waitTime} mins`);
        console.log(`People In Lineup: ${clinic.queue.size()}`);
      });
    });
  }
}

export class ReportMaker {
  constructor(private report: IReport) {}

  printDetails(): void {
    this.report.printDetails();
  }
}
