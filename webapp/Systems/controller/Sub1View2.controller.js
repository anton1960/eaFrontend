sap.ui.define(["sap/ui/core/mvc/Controller", "../model/formatter"], function(
  Controller,
  formatter
) {
  "use strict";

  return Controller.extend(
    "fcl/EA/EA-System.Systems.controller.Sub1View1",
    {
      formatter: formatter,

      onInit: function() {},

      onPressNav1Button: function() {
        this.getOwnerComponent()
          .getRouter()
          .navTo("sub1view1");
      }
    }
  );
});
