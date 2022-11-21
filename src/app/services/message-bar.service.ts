import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MessageBar} from "../types/messageBar";

@Injectable()
export class MessageBarService {

  notificacion$: Subject<MessageBar> = new Subject()

  constructor() {
  }

  get notify() {
    return this.notificacion$.asObservable()
  }

  /**
   * Show Message Bar Global
   * @param title Title Message
   * @param status Status MeessageBar
   * @param timeout Default 3000
   */
  showMessage(title: string, status: any, timeout: number = 3000) {
    this.notificacion$.next({
      status,
      text: title,
      variant: 'normal',
      open: true
    })

    setTimeout(() =>
        this.notificacion$.next({
          open: false,
          text: '',
          status: ''
        })
      , timeout)

  }
}
