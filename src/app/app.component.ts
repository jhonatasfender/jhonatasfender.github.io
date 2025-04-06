import { Component } from '@angular/core';
import { TerminalComponent } from './terminal/terminal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TerminalComponent]
})
export class AppComponent {
  public title = 'portfolio';
}
