import { IReport } from "./IReport";

export default class ReportMaker {
  private report: IReport;

  constructor(report: IReport) {
    this.report = report;
  }

  printDetails() {
    this.report.printDetails();
  }
}
