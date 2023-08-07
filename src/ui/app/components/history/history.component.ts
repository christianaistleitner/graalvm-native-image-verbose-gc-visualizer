import { Component, Input } from '@angular/core';
import { Chunk, Data } from "../../types/types";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  @Input()
  data: Data[] = []

  @Input()
  epoch: number = 0

  @Input()
  chunk: string = ""

  getChunks(): Array<Array<Chunk | undefined>> {
    return this.data.map(
      it => [
        it.before.find(it => it.start == this.chunk),
        it.after.find(it => it.start == this.chunk)
      ]
    )
  }
}
