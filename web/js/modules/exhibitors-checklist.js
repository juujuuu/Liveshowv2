 //exhibApp.js
 (function () {
     const compulsoryDisplayColor = {
         "not started": "#ffc6b5",
         "completed": "#c4e2b3",
         "in progress": "#ffc6b5",
         "not applicable": "#7c7e82"
     }
     const optionalDisplayColor = {
         "not started": "#f2d6d2",
         "in progress": "#f2d6d2",
         "completed": "#edecde",
         "not applicable": "#7c7e82"

     }
     let app = angular.module('myFirebaseApp', ['firebase']);

     let urlParams = new URLSearchParams(window.location.search);
     let exhibitorid = urlParams.get('exhibitorid');
     if (exhibitorid != null) {
         Cookies.remove("exhibitorid");
         Cookies.set("exhibitorid", exhibitorid);
     } else {
         exhibitorid = Cookies.get("exhibitorid");
     }
     let expoCode = $("#metaData").data("expo");
     let showGuideLink = $("#metaData").data("showguidelink")

     if (window.location.href.includes("foam-expo.com")) {
         var lrLink = "../lead-retrieval-orders/";
     } else if (window.location.href.includes("spacetechexpo.eu")) {
         var lrLink = "../bre-lead-retrieval/";
     } else if (window.location.href.includes("ceramicsexpousa.com")) {
         var lrLink = "../lead-retrieval-orders/";
     } else {
         var lrLink = $("#metaData").data("lrlink");
     }
     let lvLink = $("#metaData").data("lvlink");
     let standformLink = $('#metaData').data("standformlink");
     let dynamicUrlExtensions = {
         'auto_ep_task_complete_online_profile__c': showGuideLink,
         'self_ep_task_order_lead_retrieval__c': lrLink,
         'self_ep_task_lunch_vouchers__c': lvLink,
         'auto_ep_task_submit_stand_info_form__c': standformLink
     };
     console.log(dynamicUrlExtensions);


     const rootRefTaskDetails = firebase.database().ref('exhibitorTaskDetails');
     isFirebaseWorking = rootRefTaskDetails;
     const refTaskDetails = rootRefTaskDetails.child(expoCode);

     app.controller('FirebaseCtrl', function ($firebaseObject, $scope) {

         this.booleanVar = false;
         this.models = {};
         this.dynamicUrlExtensions = dynamicUrlExtensions;

         const refTaskObject = $firebaseObject(refTaskDetails);
         this.refTaskObject = refTaskObject;

         const rootRef = firebase.database().ref('exhibitorTaskStatus');
         const ref = rootRef.child(exhibitorid);
         this.taskStatusObject = $firebaseObject(ref);

         this.compulsoryDisplayColor = compulsoryDisplayColor;
         this.optionalDisplayColor = optionalDisplayColor;

         this.selectNewStatus = function (task, status) {
             updateStatus(task, status);
         }
         this.updateStatusLinkClick = function (task, status) {
             if (!status || status == "not started") {
                 updateStatus(task, "in progress");
             }
         }
         this.dateFormating = function (dateString) {
             if (!dateString) {
                 return
             } else {
                 let date = new Date(dateString);
                 let formattedString = date.toLocaleDateString('en-GB', {
                     day: 'numeric',
                     month: 'long'
                 });
                 return formattedString;
             }
         }

         function updateStatus(task, status) {
             let updateObject = {};
             updateObject[task] = status;
             ref.update(updateObject);
         }
     });

 })()