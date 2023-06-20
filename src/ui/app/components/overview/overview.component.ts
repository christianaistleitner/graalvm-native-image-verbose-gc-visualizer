import { Component, Input } from '@angular/core';
import { Data } from "../../types/types";
import { ChartConfiguration, ChartOptions } from "chart.js";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  @Input()
  data: Data[] = []

  public get lineChartData(): ChartConfiguration<'line'>['data'] {
    const series = new Map<string, number[]>();
    for (let entry of this.data) {
      entry.timers.forEach((value, key, _) => {
        const values = series.get(key) ?? [];
        values.push(value);
        series.set(key, values);
      })
    }
    return {
      labels: this.data.map(it => "Epoch " + it.epoch),
      datasets: Array.from(series.entries()).map(it => {
        return {
          label: it[0],
          data: it[1],
          borderDash: [10, 5]
        }
      })
    };
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
}
