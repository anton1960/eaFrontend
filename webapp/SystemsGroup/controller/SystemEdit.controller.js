sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/routing/HashChanger",
    "sap/uiext/inbox/InboxSecondaryFilterPathEnum",
    "sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text",
	"sap/ui/core/library",
	"sap/ui/core/Item",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Element"
], function (BaseController,
    JSONModel,
    History,
    MessageToast,
    MessageBox,
    HashChanger,
    InboxSecondaryFilterPathEnum,
    Dialog,
	Button,
	mobilelibrary,
	Text,
	corelibrary,
	Item,
	Filter,
	FilterOperator,
	Element
    
    
    ) {
    "use strict";

    return BaseController.extend("fcl/EA/EA-System.SystemsGroup.controller.SystemEdit", {


        /* =========================================================== */
        /* lifecycle methods */
        /* =========================================================== */
        /**
         * Called when the add controller is instantiated.
         * @public
         */
        onInit: function () {
            // Register to the add route matched	this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatche	d, this);

            this.getRouter().getRoute("EditSystem").attachPatternMatched(this._onRouteMatched, this);

        },
        /* =========================================================== */
        /* event handlers */
        /* =========================================================== */
        _onRouteMatched: function (oEvent) {
            //here goes your logic which will be executed when the "add" routeis hit
            //will be done within the next unit
            // register for metadata loaded events
            //  console.log(this.getView().getModel().toString())



            console.log('matched Edit')
            console.log(window.decodeURIComponent(oEvent.getParameter("arguments").objectId))
            this.getView().bindElement({
                path: "/EA_System/" + window.decodeURIComponent(oEvent.getParameter("arguments").objectId),

            });

        },
        onBeforeRebind: function (oEvent) {

            var mBindingParams = oEvent.getParameter("bindingParams");
            mBindingParams.parameters["expand"] = "images";
            console.log(oEvent.getParameter("bindingParams"))
        },

        _onMetadataLoaded: function () {
            // create default properties
            console.log("metadata")
            // bind the view to the new entry
            this.getView().setBindingContext(this._oContext);

        },
        onCreateSuccess: function (oSyste, ) {
            // navigate to the new product's object view
            var sId = oSystem.ID;
            this.getRouter().navTo("systemList", {
                objectId: sId
            }, true);
            // unbind the view to not show this object again
            this.getView().unbindObject();
            // show success messge
            var sMessage = this.getResourceBundle().getText("newObjectCreated", [oProduct.Name]);
            MessageToast.show(sMessage, {
                closeOnBrowserNavigation: false
            });
        },
        /**
        * Event handler for navigating back.
        * It checks if there is a history entry. If yes, history.go(-1) will
        happen.
        * If not, it will replace the current entry of the browser history
        with the worklist route.
        * @public
        */
        /**
         * Event handler for the cancel action
         * @public
         */
        onCancel: function () {
            this.onNavBack();
        },
        /**
         * Event handler for the save action
         * @public
         */
        onSave: function () {
            console.log("safe")
            this.getModel().submitChanges();
        },

        onNavBack: function () {
            console.log("systemGroup/view2")
            this.getRouter().navTo("Sub1View2", {

            })


        },
        onAddPicturePress: function (oEvent) {
            var bindingContext = this.getView().getBindingContext();
            console.log(this.getView().getBindingContext().getObject());
            console.log(bindingContext)
            console.log(oEvent)
            var sMessage = "picture pressed"
            MessageToast.show(sMessage, {
                closeOnBrowserNavigation: false
            });
            var systemId = this.getView().getBindingContext().getObject().ID.toString()
            var oModel = this.getView().getModel()
            var iID = parseInt(Math.random() * 100000, 10)
            var oProperties = {
                ID: iID,
                SystemID: systemId,
                systems_ID: systemId
            };
            var oContext = oModel.createEntry("/EA_Images", {
                properties: oProperties

            })

            console.log(oContext)
            console.log(oContext.sDeepPath)
            oModel.submitChanges({
                success: function () {
                    console.log("success Picture created")

                    console.log(oContext.getObject())
                    console.log(oContext.sDeepPath)

                    var oProperties = {
                        "FileName": "Anton.jsp"

                    };
                    oModel.update(oContext.sDeepPath, oProperties)

                },
                error: function () {
                    console.log("error")
                }
            })

        },


        onUploadCompleted: function (oEvent) {
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();
        },
        _uploadContent: function (item, id) {
            console.log(item)
            console.log("ID> " + id)

            var url = `/v2/odata/v4/system-odata/EA_Images(${id})/content`
            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.uploadItem(item);
        },


        onAfterItemAdded: async function (oEvent) {
            var item = oEvent.getParameter("item")
           // console.log(item)
           // var id = await this._createEntity(item)
           
            this._createEntity(item)
            .then((id) => {
                this._uploadContent(item, id);
            })
            .catch((err) => {
                console.log(err);
            })


        },
        _createEntity: function (item) {
            console.log("hier bin ich")
            var systemId = this.getView().getBindingContext().getObject().ID.toString()
            console.log(systemId)
            var data = {
                mediaType: item.getMediaType(),
                FileName: item.getFileName(),
                size: item.getFileObject().size,
                systems_ID: systemId
            };
            console.log(data)
            var settings = {
                url: "/v2/odata/v4/system-odata/EA_Images",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((results, textStatus, request) => {
                        console.log(results.ID)
                        resolve(results.d.ID);
                    })
                    .fail((err) => {
                        reject(err);
                    })
            })
        },

        _createEntity__: async function (item) {
            var ret = 0
            console.log("hier bin ich")
            var systemId = this.getView().getBindingContext().getObject().ID.toString()
            console.log(systemId)
            var oProperties = {
                mediaType: item.getMediaType(),
                FileName: item.getFileName(),
                size: item.getFileObject().size,
                systems_ID: systemId
            };

            var oModel = this.getView().getModel()
            //  oModel.setUseBatch(false);
            var oContext = await oModel.createEntry("/EA_Images", {
                properties: oProperties
            })
      
            var oCont = await oModel.submitChanges({
                success: function(data){
                    console.log(data  + " Successs ")
                },
                error: function(oError){
                    console.log(oError  + " Error")
                },

            });
            console.log(oContext)
            return 1



        },

        //formatters
        formatThumbnailUrl: function (mediaType) {
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                case "image/jpeg":
                    iconUrl = "sap-icon://attachment-photo";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        },
        onRemovePressed: function (oEvent) {
            var fnSuccess = function (data, response) {
                //  this._setBusy(false);
                //   var sMessage = that._getText("changesSentMessage");
                MessageToast.show("removed");
                // this._setUIChanges(false);
            };
            var fnError = function (e) {
                //  this._setBusy(false);
                //  this._setUIChanges(false);
                MessageToast.show(e.message);
            };
            oEvent.preventDefault();
            console.log(oEvent.getParameter("item").getBindingContext())
            oEvent.getParameter("item").getBindingContext().delete();
            MessageToast.show("Selected file has been deleted");
            var sPath = oEvent.getParameter("item").getBindingContext().sPath
            this.getView().getModel().remove(sPath, {
                success: fnSuccess,
                error: fnError
            });


        },
        onOpenPressed: function (oEvent) {
            oEvent.preventDefault();
            var item = oEvent.getSource();
            this._fileName = item.getFileName();


            var that = this;
            this._download(item)
                .then((blob) => {
                    var url = window.URL.createObjectURL(blob);
                    //						window.open(url);	
                    var link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', that._fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.open(url)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        _download: function (item) {
            var settings = {
                url: item.getUrl(),
                method: "GET",
                headers: {
                    "Content-type": "application/octet-stream"
                },
                xhrFields: {
                    responseType: 'blob'
                }
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((result) => {
                        resolve(result)
                    })
                    .fail((err) => {
                        reject(err)
                    })
            });
        },



    })
});