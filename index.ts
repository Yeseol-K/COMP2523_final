import Map from "./map";
import ReportMaker from "./reportMaker";
import SimpleReport from "./simpleReport";
import { ComplexReport } from "./complexReport";
// import data from "./data.json";
const data = require("./data.json");

async function main() {
  const map = new Map(data);
  map.printMap();
  console.log("---End of Map---");

  const simpleReport = new ReportMaker(new SimpleReport(map.getClinics()));
  simpleReport.printDetails();
  const complexReport = new ReportMaker(new ComplexReport(map.getClinics()));
  complexReport.printDetails();
  console.log("---End of Report---");

  map.registerForShots(18); // age currentIntake
  console.log("-------------------");
  map.printMap();
  console.log("---End of Map---");
}

main();
