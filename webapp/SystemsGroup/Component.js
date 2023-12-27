sap.ui.define(
  ["sap/ui/core/UIComponent", 
  "sap/ui/Device", 
  "sap/ui/model/json/JSONModel",
  "./model/models"],
  function(UIComponent, Device,JSONModel, models) {
    "use strict";

   return UIComponent.extend(
      "fcl/EA/EA-System.SystemsGroup.Component",
      {
        metadata: {
          manifest: "json"
        },

        

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function() {
      
        
          var oSetupgr = new JSONModel({
             greetingText: "hallo World",
             count:"3"
          });
   
          this.setModel(oSetupgr,"setup")
          oSetupgr.setProperty("/count","10")
          oSetupgr.setProperty("/greetingText","hallo")
        
          

       
         console.log(oSetupgr)

          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);
          console.log("init component")
          // set the device model
          this.setModel(models.createDeviceModel(), "device");

          // create the views based on the url/hash
          this.getRouter().initialize();
        }
      }
    );
  }
);
