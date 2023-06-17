import { Injectable } from '@angular/core';
import { DataHolder } from "./dataHolder";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() {
  }

  parse(tokens: Array<String>): DataHolder {
    return new DataHolder();
  }
}
