sap.ui.define([
    './BaseController',
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    "sap/ui/base/Object"
], function (BaseController, Controller, fioriLibrary) {
    "use strict";

    return BaseController.extend("fcl/EA/EA-System.Systems.controller.Detail", {
        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
        },

        onSupplierPress: function (oEvent) {
            console.log("oEvent")
            var supplierPath = oEvent.getSource().getBindingContext("products").getPath(),
                supplier = supplierPath.split("/").slice(-1).pop();

            this.oRouter.navTo("detailDetail", {
                layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded,
                supplier: supplier,
                product: this._product
            });
        },

        picturePress: function (oEvent) {
            console.log(oEvent)
            var sURL =     oEvent.getSource().getProperty("src")
			var Filename = oEvent.getSource().getProperty("alt")
            fetch(sURL)
                .then((oResponse) => oResponse.blob())
                .then((oBlob) => {
                    const sBlobURL = URL.createObjectURL(oBlob);
                    const oLink = document.createElement('a');
                    oLink.href = sBlobURL;
                    oLink.download =Filename;
                    oLink.target = Filename;
                    document.body.appendChild(oLink);
                    oLink.click();
                    document.body.removeChild(oLink);
                });
            window.open(sURL)
        },
        _onProductMatched: function (oEvent) {
            console.log(oEvent.getParameter("arguments"))
            this._system = oEvent.getParameter("arguments").system
            console.log(this._system)
            this.getView().bindElement({
                path: "/" + this._system + "/",
                model: "ea"
            });
        },

        onEditToggleButtonPress: function () {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function () {
            this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
        }
    });
});