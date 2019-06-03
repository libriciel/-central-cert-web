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

  canExtension(){
    return this.getSystem() === "Windows"
        && this.getNavigator() != "Edge"
        && this.getNavigator() != "Internet Explorer"
        && (this.getNavigator() === "Firefox" || this.getNavigator() === "Chrome");
  }

  canJava(){
    return (this.getSystem() === "Windows"
        && (this.getNavigator() === "Internet Explorer" || this.getNavigator() === "Firefox"))
        || (this.getSystem() === "Linux" && this.getNavigator() === "Firefox");
  }

  haveExtension(){

    if(typeof LiberSign === "object"){
      this.getCertificates();
      return true;
    }else{
      return false;
    }
  }

  getCertificates(){
    let config = {
      appletUrl: '/applets/',
      extensionUpdateUrl: '/libersign/',
      height: 140,
      width: '100%',
      iconType: 'fa'
    }
    LiberSign.setUpdateUrl(config.extensionUpdateUrl.replace(/\/?$/, '/'));
    LiberSign.getCertificates().then(function (certs) {
    });
  }

}
