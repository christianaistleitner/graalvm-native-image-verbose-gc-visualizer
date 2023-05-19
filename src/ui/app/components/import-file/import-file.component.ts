import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent {

  @Output()
  content = new EventEmitter<string>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.item(0);
    file?.text()?.then(it => this.content.emit(it));
  }
}
