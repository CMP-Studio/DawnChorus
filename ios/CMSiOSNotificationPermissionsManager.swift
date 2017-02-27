//
//  CMSiOSNotificationPermissionsManager.swift
//  DawnChorus
//
//  Created by Ruben Niculcea on 11/30/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import UserNotifications

enum CMSiOSNotificationPermissionsStatus:String {
  case NotDetermined = "NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED"
  case Denied = "NOTIFICATION_PERMISSIONS_STATUS_DENIED"
  case Authorized = "NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED"
}

@objc(CMSiOSNotificationPermissionsManager)
class CMSiOSNotificationPermissionsManager: NSObject {
  
  @objc func requestPermissions(_ resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) {(accepted, error) in
      if accepted {
        resolve(nil)
      } else {
        if let _error = error {
          reject("Notification permissions failed", _error.localizedDescription, nil)
        } else {
          reject("Notification permissions failed", "Rejected by user", nil)
        }
      }
    }
  }
  
  @objc func checkPermissions(_ resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().getNotificationSettings { (notificationSettings) in
      let notificationPermissionsStatus:CMSiOSNotificationPermissionsStatus
      
      switch (notificationSettings.authorizationStatus) {
      case .authorized:
        notificationPermissionsStatus = .Authorized
      case .denied:
        notificationPermissionsStatus = .Denied
      case .notDetermined:
        notificationPermissionsStatus = .NotDetermined
      }
      
      resolve(notificationPermissionsStatus.rawValue)
    }
  }
}
