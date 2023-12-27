sap.ui.define([
        './BaseController',
        "sap/m/MessageToast",
        "sap/ui/core/mvc/Controller",
        "sap/ui/Device",
        "sap/base/Log",
        "sap/ui/model/json/JSONModel"
        
        
    ],
    function (BaseController,MessageToast, Controller, Device, Log, JSONModel) {
        "use strict";

        return BaseController.extend(
            "fcl/EA/EA-System.SystemsGroup.controller.Sub1View2", {


                onInit: function () {
                    this.getSplitAppObj().setHomeIcon({
                        'phone': 'phone-icon.png',
                        'tablet': 'tablet-icon.png',
                        'icon': 'desktop.ico'
                    });
                    this.getSplitAppObj().setMode("HideMode")
                    Device.orientation.attachHandler(this.onOrientationChange, this);
                    var oImageEditor = this.getView().byId("image");
                    console.log(oImageEditor)
                    var oModel = new JSONModel({
                        blocked: true
                    });
                 //   this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                    console.log(this.getView())
                    oImageEditor.setModel(oModel);
                    this.getRouter().initialize();
                    sap.ui.getCore().getEventBus().publish("nav", "SystemsGroup:view2");
                },

                onBeforeRebind: function (oEvent) {
              
                    var mBindingParams = oEvent.getParameter("bindingParams");
                    mBindingParams.parameters["expand"] = "images";
                    console.log(oEvent.getParameter("bindingParams"))
                },
                onRowSelectionChange: function(oEvent){
                 var sPath = oEvent.getParameter('listItem').getBindingContext().getObject()
                 this.getRouter().navTo("EditSystem", {
                    objectId: sPath.ID
                });

               },
              
                onExit: function () {
                    Device.orientation.detachHandler(this.onOrientationChange, this);
                },

                onOrientationChange: function (mParams) {
                    var sMsg = "Orientation now is: " + (mParams.landscape ? "Landscape" : "Portrait");
                    MessageToast.show(sMsg, {
                        duration: 5000
                    });
                },

                onPressNavToDetail: function () {
                    this.getSplitAppObj().to(this.createId("detailDetail"));
                },

                onPressDetailBack: function () {
                    this.getSplitAppObj().backDetail();
                },

                onPressMasterBack: function () {
                    this.getSplitAppObj().backMaster();
                },

                onPressGoToMaster: function () {
                    this.getSplitAppObj().toMaster(this.createId("master2"));
                },

                onListItemPress: function (oEvent) {
                    var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

                    this.getSplitAppObj().toDetail(this.createId(sToPageId));
                },

                onListItemPress2: function (oEvent) {
                    var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

                    this.getSplitAppObj().toDetail(this.createId(sToPageId));
                },
                onPressModeBtn: function (oEvent) {
                    var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

                    this.getSplitAppObj().setMode(sSplitAppMode);
                    MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {
                        duration: 5000
                    });
                },

                getSplitAppObj: function () {
                    var result = this.byId("SplitApp");
                    if (!result) {
                        Log.info("SplitApp object can't be found");
                    }
                    return result;
                },

                onPressNav1Button: function () {
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("sub1view1");
                },
                formatRowHighlight: function (oValue) {
                    // Your logic for rowHighlight goes here
                    if (oValue < 5) {
                        return "Error";
                    } else if (oValue < 10) {
                        return "Warning";
                    } else if (oValue < 15) {
                        return "None";
                    }
                    return "Success";
                },
                onImageLoaded: function () {
                    var oImageEditor = this.getView().byId("image");

                    this.getView().getModel().setProperty("/blocked", !oImageEditor.getSrc());
                },

                onSaveAsPress: function () {
                    var oImageEditor = this.getView().byId("image");

                    oImageEditor.openSaveDialog();
                },

                onImageUploadPress__: async function (oEvent) {

                    var oImageEditor = this.getView().byId("image");
                    var    oUploader = this.getView().byId("imageuploader")
                   
                    var oModel = await this.getView().getModel()

                     oImageEditor.getImageAsBlob().then(function (oBlob) {
                        console.log("bild" + oBlob)

                        var iID = parseInt(Math.random() * 100000, 10)
                        var oProperties = {
                            ID:iID,
                            SystemID: "SYS-" + iID,
                            content: oBlob,
                            Type:'System',
                            RefID:1

                        };
                        
                        var oContext = oModel.createEntry("/EA_Images", {
                            properties: oProperties

                        })
                     
                        oModel.submitChanges({
                            success: function () {
                                console.log("success change")
                                var url = "/EA_Images"
                                oUploader.setUploadUrl(url)
                                oUploader.upload()

                            },
                            error: function () {
                                console.log("error")
                            }
                        })

                        oContext.created().then(
                            function () {
                                console.log("success context" )
                            },
                            function () {
                                console.log("success")
                            }
                        );


                    })
                },

                onFileChangeImage: function (oEvent) {
                    
                    console.log("hier bin ich")

                    var oFile = oEvent.getParameter("files")[0];
                    this.file = oFile;
                    var  oImageEditor = this.getView().byId("image");


                    if (!oFile) {
                        return;
                    }
                    var    oUploader = this.getView().byId("imageuploader")
                    this.getView().getModel().setProperty("/blocked", true);
                    oImageEditor.setSrc(oFile);
                    this.csrfToken = this.getView().getModel().getSecurityToken();
                    oUploader.setSendXHR(true); 
                    var url =    "/EA_Images(6)/content"
                    //var url = "/EA_Images(7)/content"
                    console.log(url)
                   // oUploader.setSendXHR(true)
                     oUploader.setHttpRequestMethod("PUT")
                    var headerParma2 = new sap.ui.unified.FileUploaderParameter();
                    headerParma2.setName('slug');
                    headerParma2.setValue(oUploader.getValue());
                    oUploader.addHeaderParameter(headerParma2);
                    oUploader.checkFileReadable().then(function() {
                   


                    oUploader.setUploadUrl(url)
                    console.log(url)
                 //   oUploader.additionalData= "abc=123&test=456"
                   
                    oUploader.upload()
                    
                    })



                },
                handleUploadComplete: function(oEvent) {
                    console.log(oEvent)
                    var sResponse = oEvent.getParameters("response");
                    console.log(sResponse)
                    
                     this.getView().byId("imageuploader").clear();

                },
                handleUploadStart: function (oEvent){
                    console.log(oEvent)

                },
                handleUploadAbort:function(oEvent){
                   console.log(oEvent)

                },
                onFileChangeAscciFU: function (oEvent) {
                                         
                  var  oFileUploader = this.getView().byId("idfileUploader");
                  var  oFile = oEvent.getParameters("files").files[0]
                  this.file = oFile
                  oFileUploader.file = oFile
                 
                  if (!oFile) {
                      console.log("no file")
                      return;
                  }
                  else{
                    console.log(oFile)
                  }

                  var reader = new FileReader();
                  var t = this;
                  reader.onload = function(e) {
                    var strCSV = e.target.result;
                    var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
                    console.log(arrCSV)
                    var noOfCols = 5;
              
                    // To ignore the first row which is header
                    var hdrRow = arrCSV.splice(0, noOfCols);
              
                    var data = [];
                   while (arrCSV.length > 0) {
                  var obj = {};
                  // extract remaining rows one by one
                  var row = arrCSV.splice(0, noOfCols)
                  console.log(row)
                  for (var i = 0; i < row.length; i++) {
                      obj[hdrRow[i]] = row[i].trim()
                  }
                  // push row to an array
                  data.push(obj)
                    }
                    console.log(data)
                    // Bind the data to the Table
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(data);
                    var oTable = t.byId("idTable");
                    oTable.setModel(oModel);
                };
                //   reader.readAsText(oFile);
              },
       
              onUploadAscci: function (oEvent) {

                var oFileUploader = this.getView().byId("idfileUploader");
                    console.log("file >" + oFileUploader.file)
                    oFileUploader.setUploadUrl("upload/")
              /*      oFileUploader.checkFileReadable().then(function( ) {
                     
                        oFileUploader.upload();
                    }, function(error) {
                        MessageToast.show("The file cannot be read. It may have changed.");
                    }).then(function() {
                       // oFileUploader.clear();
                    });
              */
                    var reader = new FileReader();
                    var t = this;
                    reader.onload = function(e) {
                        var strCSV = e.target.result;
                        var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
                        console.log(arrCSV)
                        var noOfCols = 5;
                  
                        // To ignore the first row which is header
                        var hdrRow = arrCSV.splice(0, noOfCols);
                  
                        var data = [];
                       while (arrCSV.length > 0) {
                      var obj = {};
                      // extract remaining rows one by one
                      var row = arrCSV.splice(0, noOfCols)
                      console.log(row)
                      for (var i = 0; i < row.length; i++) {
                          obj[hdrRow[i]] = row[i].trim()
                      }
                      // push row to an array
                      data.push(obj)
                        }
                        console.log(data)
                        // Bind the data to the Table
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(data);
                        var oTable = t.byId("idTable");
                        oTable.setModel(oModel);
                    };




                      reader.readAsText(oFileUploader.file);
                },
          
                handleUploadPress: function () {
                    var oFileUploader = this.byId("fileUploader");
                    oFileUploader.checkFileReadable().then(function () {
                        oFileUploader.upload();
                    }, function (error) {
                        MessageToast.show("The file cannot be read. It may have changed.");
                    }).then(function () {
                        oFileUploader.clear();
                    });
                },
                onsavePress:function(oEvent){
                    console.log(oEvent)
                    console.log(table)
                    var table = oEvent.getParameters("id").id.split('_')[1];
                    console.log("table " + table)
                    MessageToast.show("hier bin ich")
                   // var oModel = this.byId("systemgrouptable").getModel();
                    var oModel =  this.getOwnerComponent().getModel();
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
                    console.log(oEvent)
                    
                    var table = oEvent.getParameters("id").id.split('_')[1];
                    console.log("table " + table)
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
              
                    var oTable = this.getView().byId(table).getTable();
                    var j
                   
               
                    var oItems = oTable.getSelectedIndices();
                    console.log(oItems.length)
                    for (var k = 0; i < oItems.length; k++) {
                      console.log(i);
                    }
            
                    
                    for (var i = 0; i < oItems.length; i++) {
                      j = oItems[i];
                  //     var l_sysgroup = await oTable.getContextByIndex(j)
                  //      .getProperty("ID");
                      var sPath =  oTable.getContextByIndex(j).getPath() 
                      // and fetch rest of fie lds in similar pattern
                       console.log(sPath)
                       await this.getView().getModel().remove(sPath, {
                          success:await fnSuccess,
                          error:  await fnError
                    });
                    }   
                 },
                onNewpressed: function(oEvent) {
                    //here goes your logic which will be executed when the "add" routeis hit
                    //will be done within the next unit
                    // register for metadata loaded events
                    console.log(oEvent)
                    var table = oEvent.getParameters("id").id.split('_')[1];
                    console.log("table " + table)
                  
                    console.log(this.getView())
                    var oTable = this.getView().byId(table).getTable();
                    
                    var oEntity= oTable.getParent().getEntitySet()
                    console.log(oTable)  
                    

                    var oProperties = {
                        ID:1
                    };
                    var oModel = this.getOwnerComponent().getModel()
                 
                    var context= oModel.createEntry("/"+ oEntity,oProperties)
                 //   sap.ui.getCore().byId("systemgrouptable").getModel().createEntry("/EA_System_Group",oProperties)
                  
                     oModel.submitChanges();
                     this.getView().setBindingContext(this._oContext);
                     //var oTable = this.getView().byId(table)
                     oTable.setBindingContext(context);
                     console.log("insert")
                   
                  

                    },
                
            }
        );
    });