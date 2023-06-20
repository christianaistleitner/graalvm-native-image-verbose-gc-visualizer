import { Injectable } from '@angular/core';
import { Data, Gen, Space } from "../../types/types";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() {
  }

  parse(tokens: Array<string>): Data[] {
    const result = [];

    const scanner = new Scanner(tokens);
    while (scanner.isNotEmpty()) {
      const entry: Data = {
        policy: "", type: "", cause: "", before: [], after: [], epoch: 0, timestamp: 0, timers: new Map()
      }

      // Search for start pattern
      scanner.search("[", "[")

      // Collection properties
      if (scanner.checkPattern(/[0-9]*/)) {
        entry.timestamp = Number(scanner.get());
        scanner.advance();
      } else continue;

      if (scanner.expect("GC", ":", "before", "epoch", ":")) {
      } else continue;

      if (scanner.checkPattern(/[0-9]*/)) {
        entry.epoch = Number(scanner.get());
        scanner.advance();
      } else continue;

      if (scanner.expect("cause", ":")) {
      } else continue;

      entry.cause = scanner.get();
      scanner.advance();

      scanner.search("Young", "generation", ":")
      scanner.search("Eden", ":")

      let isAligned = true;
      while (scanner.get() != "Survivors") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.before.push({
            gen: Gen.Young,
            space: Space.Eden,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.expect("Survivors", ":");

      isAligned = true;
      while (scanner.get() != "Old") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.before.push({
            gen: Gen.Young,
            space: Space.Survivor,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.search("Old", "generation", ":");

      isAligned = true;
      while (scanner.get() != "Unused") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.before.push({
            gen: Gen.Old,
            space: Space.Tenured,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.search("Unused", ":");

      isAligned = true;
      while (scanner.get() != "]") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.before.push({
            gen: undefined,
            space: undefined,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      // Collection properties (retrospect)
      scanner.search("policy", ":");
      entry.policy = scanner.get();
      scanner.search("type", ":");
      entry.type = scanner.get();

      scanner.search("Young", "generation", ":")
      scanner.search("Eden", ":")

      isAligned = true;
      while (scanner.get() != "Survivors") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.after.push({
            gen: Gen.Young,
            space: Space.Eden,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.expect("Survivors", ":");

      isAligned = true;
      while (scanner.get() != "Old") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.after.push({
            gen: Gen.Young,
            space: Space.Survivor,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.search("Old", "generation", ":");

      isAligned = true;
      while (scanner.get() != "Unused") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.after.push({
            gen: Gen.Old,
            space: Space.Tenured,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }

      scanner.search("Unused", ":");

      isAligned = true;
      while (scanner.get() != "[") {
        if (scanner.check("unaligned", "chunks", ":")) {
          isAligned = false;
        }
        if (scanner.checkPattern(/0x[a-f0-9]+/)) {
          const start = scanner.get();
          scanner.advance(4);
          const top = scanner.get();
          entry.after.push({
            gen: undefined,
            space: undefined,
            start,
            top,
            isAligned
          })
        }
        scanner.advance();
      }
      // Timers
      if (scanner.search("GC", "nanoseconds", ":")) {
        while (scanner.get() != "GCLoad") {
          const name = scanner.get();
          scanner.advance(2);
          const value = scanner.get();
          scanner.advance();
          entry.timers.set(name, Number(value));
        }
      }
      
      result.push(entry);

      scanner.advance();
    }

    return result;
  }
}

class Scanner {

  private cursor: number = 0;

  constructor(private tokens: Array<string>) {

  }

  expect(...tokens: string[]): boolean {
    for (let token of tokens) {
      if (this.tokens.at(this.cursor) == token) {
        this.advance();
      } else {
        return false;
      }
    }
    return true;
  }

  expectPattern(regex: RegExp): boolean {
    const result = regex.test(this.get());
    this.cursor++;
    return result;
  }

  checkPattern(regex: RegExp): boolean {
    return regex.test(this.get());
  }

  check(...tokens: string[]): boolean {
    for (let i = 0; i < tokens.length; i++) {
      if (this.tokens.at(this.cursor + i) != tokens[i]) {
        return false;
      }
    }
    return true;
  }

  search(...tokens: string[]): boolean {
    let i = 0;
    while (i < tokens.length && this.isNotEmpty()) {
      if (this.tokens.at(this.cursor) == tokens[i]) {
        i++;
      } else {
        i = 0;
      }
      this.advance();
    }
    return this.isNotEmpty();
  }

  advance(n: number = 1) {
    this.cursor += n;
  }

  get(): string {
    return this.tokens.at(this.cursor)!;
  }

  isNotEmpty(): boolean {
    return this.cursor < this.tokens.length;
  }
}
