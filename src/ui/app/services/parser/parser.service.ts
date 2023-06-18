import { Injectable } from '@angular/core';
import { Data, HeapPolicyParameters, NativeImageHeapBoundaries } from "../../types/types";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private readonly heapPolicyParametersSyntax: (string | RegExp)[] = [
    "[", "Heap", "policy", "parameters", ":",
    "YoungGenerationSize", ":", /[0-9]*/,
    "MaximumHeapSize", ":", /[0-9]*/,
    "MinimumHeapSize", ":", /[0-9]*/,
    "AlignedChunkSize", ":", /[0-9]*/,
    "LargeArrayThreshold", ":", /[0-9]*/,
    "]"
  ]

  private readonly nativeImageHeapBoundariesSyntax: (string | RegExp)[] = [
    "Native", "image", "heap", "boundaries", ":",
    "ReadOnly", "Primitives", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "ReadOnly", "References", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "ReadOnly", "Relocatables", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "Writable", "Primitives", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "Writable", "References", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "Writable", "Huge", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/,
    "ReadOnly", "Huge", ":", /0x[a-f0-9]*/, "-", /0x[a-f0-9]*/
  ]

  constructor() {
  }

  parse(tokens: Array<string>): Data {
    const result: Data = {
      HeapPolicyParameters: undefined,
      NativeImageHeapBoundaries: undefined
    }

    let cursor = 0;
    while (cursor < tokens.length) {

      if (this.check(tokens, cursor, this.heapPolicyParametersSyntax)) {
        result.HeapPolicyParameters = this.parseHeapPolicyParameters(tokens, cursor);
        cursor += this.heapPolicyParametersSyntax.length;
        continue;
      }

      if (this.check(tokens, cursor, this.nativeImageHeapBoundariesSyntax)) {
        result.NativeImageHeapBoundaries = this.parseNativeImageHeapBoundariesSyntax(tokens, cursor);
        cursor += this.nativeImageHeapBoundariesSyntax.length;
        continue;
      }

      cursor++;
    }

    return result;
  }

  private check(tokens: Array<string>, start: number, syntax: (string | RegExp)[]) {
    for (let i = 0; i < tokens.length; i++) {
      const expected = syntax[i];
      if (typeof expected == "string" && tokens[start + i] != expected) {
        return false;
      }
      if (expected instanceof RegExp && !expected.test(tokens[start + i])) {
        return false;
      }
    }
    return true;
  }

  private parseHeapPolicyParameters(tokens: Array<string>, cursor: number): HeapPolicyParameters {
    return {
      AlignedChunkSize: Number(tokens.at(cursor + 7)),
      LargeArrayThreshold: Number(tokens.at(cursor + 10)),
      MaximumHeapSize: Number(tokens.at(cursor + 13)),
      MinimumHeapSize: Number(tokens.at(cursor + 16)),
      YoungGenerationSize: Number(tokens.at(cursor + 19))
    }
  }

  private parseNativeImageHeapBoundariesSyntax(tokens: Array<string>, cursor: number): NativeImageHeapBoundaries {
    return {
      ReadOnly: {
        Primitives: {
          Start: tokens.at(cursor + 8),
          End: tokens.at(cursor + 10)
        },
        References: {
          Start: tokens.at(cursor + 14),
          End: tokens.at(cursor + 16)
        },
        Relocatables: {
          Start: tokens.at(cursor + 20),
          End: tokens.at(cursor + 22)
        },
        Huge: {
          Start: tokens.at(cursor + 26),
          End: tokens.at(cursor + 28)
        }
      },
      Writable: {
        Primitives: {
          Start: tokens.at(cursor + 32),
          End: tokens.at(cursor + 34)
        },
        References: {
          Start: tokens.at(cursor + 38),
          End: tokens.at(cursor + 40)
        },
        Huge: {
          Start: tokens.at(cursor + 44),
          End: tokens.at(cursor + 46)
        }
      }
    }
  }
}
