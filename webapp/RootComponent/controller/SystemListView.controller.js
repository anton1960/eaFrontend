sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Component", "../model/formatter"],
  function(Controller, Component, formatter) {
    "use strict";

    return Controller.extend(
      "fcl/EA/EA-System.RootComponent.controller.SystemListView",
      {
        formatter: formatter,

        onInit: function() {
          if (!Component.get("Systems")) {
            Component.create({
              name: "fcl/EA/EA-System.Systems",
              id: "Systems"
            }).then(
              function(Component) {
                console.log("hier bin ich controller listView")
                this.getView()
                  .byId("systemeListCtr")
                  .setComponent(Component);
              }.bind(this)
              
            );
          }
        }
      }
    );
  }
);
