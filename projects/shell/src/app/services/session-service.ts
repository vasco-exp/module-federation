import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private status = false;

  constructor() {}

  public get isActive(): boolean {
    return this.status;
  }

  public setSession(state: boolean): void {
    this.status = state;
  }
}
