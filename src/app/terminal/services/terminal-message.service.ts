import { Injectable, Inject } from '@angular/core';
import {
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../../core/interfaces/translation.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TerminalMessageService {
  constructor(
    @Inject(TRANSLATION_SERVICE)
    private translationService: ITranslationService,
  ) {}
  public getWelcomeMessages(): Observable<string[]> {
    return this.translationService
      .get(['WELCOME.MESSAGE', 'WELCOME.HELP'])
      .pipe(map((result) => result.toArray()));
  }
}
