import {Injectable} from '@angular/core';

@Injectable()

export class UtilitaryService {

  private shadowBaseRoot: any

  constructor() {
  }

  /**
   * Setter ShadowDom Root BaseComponent
   * @param shadowRoot
   */
  setContainer(shadowRoot: any) {
    this.shadowBaseRoot = shadowRoot
  }

  /**
   * Getter ShadowDom Root BaseComponent
   */
  get shadowBase() {
    return this.shadowBaseRoot
  }

}
