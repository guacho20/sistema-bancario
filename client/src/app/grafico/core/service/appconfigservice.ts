import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  config: AppConfig = {
    theme: 'saga-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}
