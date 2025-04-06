import { Component } from '@angular/core';
import { TerminalComponent } from './terminal/terminal.component';
import { HelpPanelComponent } from './help-panel/help-panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TerminalComponent, HelpPanelComponent, TranslateModule]
})
export class AppComponent {
  public title = 'portfolio';
}
