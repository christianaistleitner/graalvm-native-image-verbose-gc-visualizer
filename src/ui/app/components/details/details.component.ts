import { Component, Input } from '@angular/core';
import { Data } from "../../types/types";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input()
  data: Data[] = []

  @Input()
  selected: number = 0
}
