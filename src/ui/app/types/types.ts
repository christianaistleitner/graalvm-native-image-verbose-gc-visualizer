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
  gen: string,
  space: string,
  isAligned: boolean,
  start: string,
  top: string
}
