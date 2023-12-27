sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Component", "../model/formatter"],
  function(Controller, Component, formatter) {
    "use strict";

    return Controller.extend(
      "fcl/EA/EA-System.RootComponent.controller.Component2View",
      {
        formatter: formatter,

        onInit: function() {
          if (!Component.get("sub2Component")) {
            Component.create({
              name: "fcl/EA/EA-System.Sub2Component",
              id: "sub2Component"
            }).then(
              function(Component) {
                this.getView()
                  .byId("sub2CmpCtr")
                  .setComponent(Component);
              }.bind(this)
            );
          }
        }
      }
    );
  }
);
