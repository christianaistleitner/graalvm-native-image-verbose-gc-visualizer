import { Component, Input } from '@angular/core';
import { Chunk, Data } from "../../types/types";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  @Input()
  data: Data[] = []

  @Input()
  epoch: number = 0

  getSelectedEntry(): Data {
    return this.data[this.epoch - 1];
  }

  getChunks(): Array<Array<Chunk | undefined>> {
    const chunks: Array<Array<Chunk | undefined>> = [];
    const entry = this.getSelectedEntry();
    for (let chunk of entry.before) {
      chunks.push([chunk, undefined]);
    }
    for (let chunk of entry.after) {
      const pair = chunks.find(it => it[0]?.start == chunk.start);
      if (pair) {
        pair[1] = chunk;
      } else {
        chunks.push([undefined, chunk]);
      }
    }
    return chunks;
  }
}
