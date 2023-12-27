sap.ui.define([
    './BaseController',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/odata/v2/ODataModel',
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"

], function (BaseController, Controller, ODataModel, Fragment,MessageToast) {
    "use strict";

    return BaseController.extend("fcl/EA/EA-System.SystemsGroup.controller.Systemsystemgroup", {
                                  
        onInit: function () {
            this.getRouter().initialize();
            console.log("init SystemGroup controller ")
     
        },
        onBeforeExport: function (oEvt) {
            var mExcelSettings = oEvt.getParameter("exportSettings");

            // Disable Worker as Mockserver is used in Demokit sample
            mExcelSettings.worker = false;
        },
        onNavBack: function () {
            this.getRouter().navTo("systemlist")
                 
        },
        onMenuPress: function () {
            console.log("Menu Fragment")
            var oView = this.getView(),
                oButton = oView.byId("menubutton");

            if (!this._oMenuFragment) {
                this._oMenuFragment = Fragment.load({
                    id: oView.getId(),
                    name: "fcl.EA.EA-System.SystemsGroup.view.fragments.Menu",
                    controller: this
                }).then(function (oMenu) {
                    oMenu.openBy(oButton);
                    this._oMenuFragment = oMenu;
                    return this._oMenuFragment;
                }.bind(this));
            } else {
                this._oMenuFragment.openBy(oButton);
            }
        },
        onMenuAction: function (oEvent) {
            var oItem = oEvent.getParameter("item"),
                sItemPath = "";
            console.log(oEvent)
            sItemPath = oItem.mProperties.text
            var v = ""
            switch ( sItemPath) {
            case "": v = "systemlist";
            break;
            case "System Group": v = "Systemsystemgroup";
            break;

        }
        this.getRouter().navTo(v)


    },
    onsavePress:function(oEvent){
        console.log(oEvent)
  
        var oModel = this.byId("systemgrouptable").getModel();
        oModel.setUseBatch(true);
        //this._setBusy(true);
        console.log("save klicked")  
        var fnSuccess = function (data, response) {
          //  this._setBusy(false);
         //   var sMessage = that._getText("changesSentMessage");
         MessageToast.show("successfully saved")
         console.log("response " + JSON.stringify(response))
        
           // this._setUIChanges(false);
        };
        var fnError = function (e) {
          //  this._setBusy(false);
          //  this._setUIChanges(false);
          console.log(e.message)
        
        };
        oModel.submitChanges({
            success: fnSuccess,
            error: fnError

        });
        //this._bTechnicalErrors = false; 

    } ,
    onRemovePress: async function (oEvent) {
        var fnSuccess = function (data, response) {
            //  this._setBusy(false);
           //   var sMessage = that._getText("changesSentMessage");
              MessageToast.show("success");
             // this._setUIChanges(false);
          };
          var fnError = function (e) {
            //  this._setBusy(false);
            //  this._setUIChanges(false);
             MessageToast.show(e.message);
          };
  
        var oTable = this.getView().byId("systemgrouptable").getTable();
        var j
       
        var oItems = oTable.getSelectedIndices();
        for (var i = 0; i < oItems.length; i++) {
          console.log(i);
        }

        
        for (var i = 0; i < oItems.length; i++) {
          j = oItems[i];
           var l_sysgroup = await oTable.getContextByIndex(j)
            .getProperty("ID");
          var sPath =  oTable.getContextByIndex(j).getPath() 
          // and fetch rest of fie lds in similar pattern
           console.log(sPath)
          x=  await this.getModel().remove(sPath, {
              success: fnSuccess,
              error:   fnError
        });
        }   
     },
   
      onNewpressed: function(oEvent) {
            //here goes your logic which will be executed when the "add" routeis hit
            //will be done within the next unit
            // register for metadata loaded events
       
          
          

            var oProperties = {
                ID:1,
                System_Group: 'to be replaced'		
            };
            var oModel = this.getOwnerComponent().getModel()
            var context= oModel.createEntry("/EA_System_Group",oProperties)
         //   sap.ui.getCore().byId("systemgrouptable").getModel().createEntry("/EA_System_Group",oProperties)
          
             oModel.submitChanges();
             this.getView().setBindingContext(this._oContext);
             var oTable = this.getView().byId("systemgrouptable")
             oTable.setBindingContext(context);
             console.log("insert")

            },
        
        

       

    });
});