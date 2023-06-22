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

  public get lineChartData(): ChartConfiguration<'line'>['data'][] {
    const series = new Map<string, Map<string, number>>();
    for (let entry of this.data) {
      entry.timers.forEach((value, key, _) => {
        const points = series.get(key) ?? new Map<string, number>();
        points.set("Epoch " + entry.epoch, value);
        series.set(key, points);
      })
    }
    return Array.from(series).map(it => {
      return {
        labels: Array.from(it[1].keys()),
        datasets: [{
          label: it[0],
          data: Array.from(it[1].values()),
          borderDash: [10, 5],
          segment: {
            borderColor: "#0CAFFF",
            backgroundColor: "#0CAFFF"
          },
          borderColor: "#0CAFFF",
          pointBackgroundColor: "#0CAFFF"
        }]
      }
    });
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
}
