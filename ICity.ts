import { IHousehold } from "./IHousehold";
import { IClinic } from "./IClinic";

export interface ICity {
  households: IHousehold[];
  clinics: IClinic[];
}
