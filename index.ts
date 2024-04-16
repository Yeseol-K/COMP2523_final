import { Map, ReportMaker, ComplexReport } from "./Map";

async function main() {
  const map = new Map("data.json");
  map.printMap();
  console.log("---End of Map---");
  map.registerForShots(18); // age currentIntake
  const report = new ReportMaker(new ComplexReport(map));
  report.printDetails();
  console.log("---End of Report---");
  map.printMap();
  console.log("---End of Map---");
}

main();
