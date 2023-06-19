import { Component } from '@angular/core';
import { TokenizerService } from "./services/parser/tokenizer.service";
import { ParserService } from "./services/parser/parser.service";
import { Data } from "./types/types";

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

  data: Data[] | undefined = undefined;

  onLogsAvailable(text: string) {
    console.log(text);
    const tokens = this.tokenizerService.tokenize(text);
    console.log(tokens);
    this.data = this.parserService.parse(tokens);
    console.log(this.data);
  }
}
