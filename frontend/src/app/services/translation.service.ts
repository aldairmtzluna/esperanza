import { Injectable } from '@angular/core';
import en from '../../assets/i18n/en.json';
import es from '../../assets/i18n/es.json';

type Language = 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang: Language = 'en';
  private translations: any = en;

  setLanguage(lang: Language): void {
    this.currentLang = lang;
    this.translations = lang === 'es' ? es : en;
  }

  t(key: string): string {
    return this.translations[key] || key;
  }

  getLanguage(): Language {
    return this.currentLang;
  }
}
