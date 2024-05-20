import { Method } from "./Method";
import { UIElements } from "./UIElements";

export interface InitOptions {
  method: Method;
  src: string[] | string;
  elements?: UIElements;
  randomize?: boolean;
  volume?: number;
}
