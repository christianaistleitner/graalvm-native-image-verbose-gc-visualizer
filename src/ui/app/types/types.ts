export type Data = {
  timestamp: number,
  epoch: number,
  cause: string,
  policy: string;
  type: string,
  before: Chunks[],
  after: Chunks[],
  timers: Map<string, number>
}

export type Chunks = {
  gen: Gen | undefined,
  space: Space | undefined,
  start: string,
  top: string
  isAligned: boolean,
}

export enum Gen {
  Young,
  Old,
}

export enum Space {
  Eden,
  Survivor,
  Tenured
}
