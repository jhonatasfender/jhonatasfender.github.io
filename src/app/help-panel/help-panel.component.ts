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
  public isMobile: boolean = window.innerWidth <= 1024;
  public isPanelOpen: boolean = false;

  constructor(
    @Inject(TRANSLATION_SERVICE) private translationService: ITranslationService
  ) {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 1024;
      if (!this.isMobile) {
        this.isPanelOpen = false;
      }
    });
  }

  public ngOnInit(): void {
    this.translationService.getAvailableLangs();
    this.translationService.getCurrentLang();
  }

  public getTranslation(key: string): string {
    const translation = this.translationService.instant(key);
    return translation?.toString() || key;
  }

  public togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  public closePanel(): void {
    this.isPanelOpen = false;
  }
}
