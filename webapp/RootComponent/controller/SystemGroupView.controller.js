sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Component", "../model/formatter"],
  function(Controller, Component, formatter) {
    "use strict";

    return Controller.extend(
      "fcl/EA/EA-System.RootComponent.controller.SystemGroupView",
      {
        formatter: formatter,

        onInit: function() {
          if (!Component.get("SystemsGroup")) {
            Component.create({
              name: "fcl/EA/EA-System.SystemsGroup",
              id: "SystemsGroup"
            }).then(
              function(Component) {
                console.log("hier bin ich controller System Group")
                this.getView()
                  .byId("systemGroupCtr")
                  .setComponent(Component);
              }.bind(this)
              
            );
          }
        }
      }
    );
  }
);
