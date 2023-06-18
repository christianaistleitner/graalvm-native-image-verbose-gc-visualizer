import { Component, Input } from '@angular/core';
import { Data } from "../../types/types";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  @Input()
  data: Data | undefined


}
