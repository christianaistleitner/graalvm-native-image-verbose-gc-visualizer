import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NgChartsModule } from 'ng2-charts';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportFileComponent,
    OverviewComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
