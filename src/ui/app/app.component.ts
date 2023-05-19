import { Component } from '@angular/core';
import { TokenizerService } from "./services/tokenizer.service";
import { ParserService } from "./services/parser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private tokenizerService: TokenizerService,
    private parserService: ParserService
  ) {
  }

  onLogsAvailable(text: string) {
    console.log(text);
    let tokens = this.tokenizerService.tokenize(text);
  }
}
