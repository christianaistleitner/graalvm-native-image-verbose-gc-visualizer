import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chunk, Data, Space } from "../../types/types";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnChanges {

  @Input()
  data: Data[] = []

  @Input()
  epoch: number = 0

  selectedChunk: string | undefined = undefined;

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

  openChunkHistory(id: string | undefined) {
    this.selectedChunk = id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedChunk = undefined;
  }

  getColor(space: Space | undefined): string {
    if (space == Space.Eden) {
      return "limegreen"
    }
    if (space == Space.Survivor) {
      return "orangered"
    }
    if (space == Space.Tenured) {
      return "dodgerblue"
    }
    return "darkslategrey"
  }

  getFillPercentage(it: Chunk) {
    if (it.isAligned) {
      return (Number(it.top) - Number(it.start)) / 1048576 * 100;
    } else {
      return 100;
    }
  }
}
