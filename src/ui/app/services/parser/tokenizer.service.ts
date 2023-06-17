import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenizerService {

  private readonly splitAt = [';', ':', ',', '[', ']', '(', ')', '<', '>', '-', '+']

  constructor() {
  }

  tokenize(input: string): Array<string> {
    const tokens = [];

    let j = 0;
    for (let i = 0; i < input.length; i++) {
      const c = input.at(i) ?? '';
      if (c.match(/\s/)) {
        if (i != j) {
          tokens.push(input.substring(j, i));
        }
        j = i + 1;
      } else if (this.splitAt.includes(c)) {
        if (i != j) {
          tokens.push(input.substring(j, i));
        }
        tokens.push(c);
        j = i + 1;
      }
    }

    return tokens;
  }
}
