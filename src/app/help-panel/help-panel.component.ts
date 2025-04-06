import { Component, Inject, OnInit } from '@angular/core';
import { ITranslationService, TRANSLATION_SERVICE } from '../core/interfaces/translation.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HelpPanelComponent implements OnInit {
  constructor(
    @Inject(TRANSLATION_SERVICE) private translationService: ITranslationService
  ) {}

  public ngOnInit(): void {
    this.translationService.getAvailableLangs();
    this.translationService.getCurrentLang();
  }

  public getTranslation(key: string): string {
    const translation = this.translationService.instant(key);
    return translation?.toString() || key;
  }
}
