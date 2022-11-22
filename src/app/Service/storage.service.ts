import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ///

  private TlocalStorage = window.localStorage;
  mvalue: any;


  constructor() { }
  public setItem(key: string, value: string) {

    value = JSON.stringify(value);
    this.TlocalStorage.setItem(key, value);
    return true;
  }
  public getItem(key: string) {


    this.mvalue = this.TlocalStorage.getItem(key);

    try {

      //  return JSON.parse(value);
      return JSON.parse(this.mvalue);;
      // return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }


  public clear() {
    this.TlocalStorage.clear();
  }
}
