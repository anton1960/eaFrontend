sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/core/BusyIndicator",
    "./model/models"
  ],
  function(UIComponent, Device, BusyIndicator, models) {
    "use strict";

    return UIComponent.extend(
      "fcl/EA/EA-System.RootComponent.Component",
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
          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);
         
          // set the device model
          this.setModel(models.createDeviceModel(), "device");

          // create the views based on the url/hash
          this.getRouter().initialize();

          this.openInterComponentRoutes();

     

          // hide BusyIndicator
          BusyIndicator.hide();
        },

        openInterComponentRoutes: function() {
          sap.ui
            .getCore()
            .getEventBus()
            .subscribe(
              "nav",
              "SystemsGroup:view2",
              function() {
                this.getRouter().navTo("SystemGroupView", {
                  viewPattern: "view2"
                });
              },
              this
            );
        }
      }
    );
  }
);
