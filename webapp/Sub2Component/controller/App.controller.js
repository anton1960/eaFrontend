sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "ui/demo/multiComponent/app/Sub2Component/model/formatter"
  ],
  function(Controller, formatter) {
    "use strict";

    return Controller.extend(
      "fcl/EA/EA-System.Sub2Component.controller.App",
      {
        formatter: formatter,

        onInit: function() {}
      }
    );
  }
);
