export type Data = {
  timestamp: number,
  epoch: number,
  cause: string,
  policy: string;
  type: string,
  before: Chunk[],
  after: Chunk[],
  timers: Map<string, number>
}

export type Chunk = {
  gen: Gen | undefined,
  space: Space | undefined,
  start: string,
  top: string
  isAligned: boolean,
}

export enum Gen {
  Young = "Young",
  Old = "Old",
}

export enum Space {
  Eden = "Eden",
  Survivor = "Survivor",
  Tenured = "Tenured"
}
