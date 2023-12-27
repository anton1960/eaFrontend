sap.ui.define(
    ["sap/ui/core/UIComponent",
        "sap/ui/Device",
        "./model/models",
        "sap/ui/model/json/JSONModel",
        'sap/f/library'
    ],
    function (UIComponent, Device, models, JSONModel,fioriLibrary) {
        "use strict";

        return UIComponent.extend(
            "fcl/EA/EA-System.Systems.Component", {
                metadata: {
                    manifest: "json"
                },

                /**
                 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
                 * @public
                 * @override
                 */
                init: function () {
                    var oRouter;
                    var oModel,oSystemModel;


                    oSystemModel  = this.getModel()
                    oSystemModel.setSizeLimit(1000);
                    this.setModel(oSystemModel, 'ea');
                   
                    console.log("component System")
                    UIComponent.prototype.init.apply(this, arguments);
                    oModel = new JSONModel();
                    this.setModel(oModel);

                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");

                    // create the views based on the url/hash
                   // this.getRouter().initialize();
                    oRouter = this.getRouter();
                    oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                    oRouter.initialize();
                },	_onBeforeRouteMatched: function(oEvent) {
                  var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout;
            
                  // If there is no layout parameter, set a default layout (normally OneColumn)
                  if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                  }
            
                  oModel.setProperty("/layout", sLayout);
                  console.log(oModel)
                }
            }
        );
    }
);