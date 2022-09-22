import { Injectable } from "@angular/core";
import { Pipe, PipeTransform } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class UserService {
  private members: any = [];

  selectedMember: Object = {};

  constructor() {}

  // -------------------------- TODO: Move below code to other service ----------------------------------
  public setMembers(userData: object[]) {
    this.members = userData;
    //INFO: use below if data need not be refreshed
    sessionStorage.setItem("members", JSON.stringify(userData));
  }

  public getMembers() {
    return JSON.parse(sessionStorage.getItem("members") || "{}");
  }

  public clearUsers() {
    sessionStorage.removeItem("members");
  }

  //--------------------------------- END ----------------------------------------------

  getUserDetails() {
    return JSON.parse(sessionStorage.getItem("userDetails") || "{}");
  }

  setUserDetails(userDetails: any) {
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    this.setAuthToken(userDetails["authToken"]);
  }

  getAuthToken() {
    if (sessionStorage.getItem("authToken")) {
      return JSON.parse(sessionStorage.getItem("authToken") || "{}");
    }
    return null;
  }

  setAuthToken(token: any) {
    sessionStorage.setItem("authToken", JSON.stringify(token));
  }

  setcompanyID(id: any) {
    sessionStorage.setItem("companyID", JSON.stringify(id));
    console.log("cid", id);
  }

  getCompanyID() {
    return JSON.parse(sessionStorage.getItem("companyID") || "{}");
  }

  setUserRole(role: any) {
    console.log("set", role);
    sessionStorage.setItem("role", JSON.stringify(role));
  }

  setCompanyName(company: any) {
    console.log("set company");
    sessionStorage.setItem("company", JSON.stringify(company));
  }

  setOmanniAuthToken(token: any) {
    sessionStorage.setItem("oamnniToken", JSON.stringify(token));
  }

  
  getOmmaniAuthToken() {
    return JSON.parse(sessionStorage.getItem("oamnniToken") || "{}");
  }

  setUserID(id: number | string) {
    sessionStorage.setItem("userId", JSON.stringify(id))
  }

  getUserId() {
    return JSON.parse(sessionStorage.getItem("userId") || "{}"); 
  }

  clearUser() {
    sessionStorage.removeItem("userDetails");
    console.log(">> User cleared.");
    this.clearToken();
  }

  clearToken() {
    sessionStorage.removeItem("authToken");
    console.log(">> Token cleared.");
  }

  clearDetails() {
    this.clearToken();
    this.clearUser();
  }

  logout() {
    // this.clearToken();
    this.clearUser();
    console.log(">> Logged out");
  }

  public setRoleBasedMenu(menu: object[]) {
    sessionStorage.setItem("menu", JSON.stringify(menu));
  }

  public getRoleMenu() {
    return JSON.parse(sessionStorage.getItem("menu") || "{}");
  }

  public setVehicleList(list: object[]) {
    sessionStorage.setItem("vehicleList", JSON.stringify(list));
  }

  public getVehicleList() {
    return JSON.parse(sessionStorage.getItem("vehicleList") || "{}");
  }

  getCurrentStartTime() {
    let currentTime = new Date().setHours(0);
    currentTime = new Date(currentTime).setMinutes(0);
    currentTime = new Date(currentTime).setSeconds(0);
    currentTime = new Date(currentTime).setMilliseconds(0);
    currentTime = new Date(currentTime).getTime();

    return currentTime;
  }

  getCurrentEndTime() {
    let currentTime = new Date().setHours(23);
    currentTime = new Date(currentTime).setMinutes(59);
    currentTime = new Date(currentTime).setSeconds(59);
    currentTime = new Date(currentTime).setMilliseconds(999);
    currentTime = new Date(currentTime).getTime();

    return currentTime;
  }

  getStartTime(date: Date) {
    let startTime = new Date(date).setHours(0);
    startTime = new Date(startTime).setMinutes(0);
    startTime = new Date(startTime).setSeconds(0);
    startTime = new Date(startTime).setMilliseconds(0);
    startTime = new Date(startTime).getTime();

    return startTime;
  }

  getTime(date: Date) {
    return new Date(date).getTime();
  }

  getEndTime(date: Date) {
    let endTime = new Date(date).setHours(23);
    endTime = new Date(endTime).setMinutes(59);
    endTime = new Date(endTime).setSeconds(59);
    endTime = new Date(endTime).setMilliseconds(999);
    endTime = new Date(endTime).getTime();

    return endTime;
  }

  getFormattedTime(timeInMilli: any) {
    let newTime = new Date(timeInMilli);
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? Number("0" + minutes) : minutes;
    let calcTime = hours + ":" + minutes + " " + ampm;
    return calcTime;
  }

  convertMS(milliseconds: any) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    return (
      (day > 9 ? day : "0" + day) +
      " : " +
      (hour > 9 ? hour : "0" + hour) +
      " : " +
      (minute > 9 ? minute : "0" + minute) +
      " : " +
      (seconds > 9 ? seconds : "0" + seconds)
    );
  }

  convertMimuetToTime(milliseconds: any) {
    var hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;

    return (hour > 9 ? hour : "0" + hour) + " : " + (minute > 9 ? minute : "0" + minute);
  }

  public arrayTextCommaSeperated(payload: Array<any>) {
    var result = new Array();
    for (var i = 0; i < payload.length; i++) {
      var selectedcol = payload[i].firstName + " " + payload[i].lastName;
      result.push(selectedcol);
    }
    return result.join(", ");
  }

  calculateWDV(d: any) {
    if (d && d.rateOfDepreciation && d.valueOfAsset && d.assetTime) {
      var date1 = new Date(d.assetTime);
      var date2 = new Date();
      var Difference_In_Time = date2.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return (d.valueOfAsset - (d.valueOfAsset * d.rateOfDepreciation * Difference_In_Days) / (100 * 365)).toFixed(2);
    } else {
      return "-";
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
         return false;
      }
      return true;
  
  }

  
}

@Pipe({ name: "keys" })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    let keys: any[] = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
