import Queue from "./queue";

export default class Clinic {
  name: string;
  blockNum: number;
  staff: number;
  queue: Queue<any>;

  constructor(name: string, blockNum: number, staff: number) {
    this.name = name;
    this.blockNum = blockNum;
    this.staff = staff;
    this.queue = new Queue<any>();
  }
  waitingList(person: any) {
    person.isVaccinated = true;
    this.queue.enqueue(person);
  }

  getAvgWaitTime(): number {
    return this.queue.size() * 15;
  }
}
