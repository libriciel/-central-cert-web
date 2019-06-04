import { Injectable } from '@angular/core';
import { Certificat } from '../model/certificat';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class KeystoreService {

  constructor(private deviceService: DeviceDetectorService) { }

  getSystem(){
    return this.deviceService.getDeviceInfo().os;
  }

  getNavigator(){
    return this.deviceService.getDeviceInfo().browser;
  }

  isCompatible(){
    return (this.getSystem() === "Windows" && this.getNavigator() != "Edge")
        || (this.getSystem() === "Linux" && this.getNavigator() === "Firefox");
  }
}
