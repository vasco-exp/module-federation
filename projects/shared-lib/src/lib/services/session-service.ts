import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private status = false;
  private userName: string = '';

  constructor() {}

  public get isActive(): boolean {
    return this.status;
  }

  public login(userName: string): void {
    this.userName = userName;
    this.status = true;
  }

  public getUserName(): string {
    return this.userName;
  }

  public logout() {
    this.status = false;
  }
}
