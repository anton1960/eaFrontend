sap.ui.define(["sap/ui/core/mvc/Controller", "../model/formatter"], function(
  Controller,
  formatter
) {
  "use strict";

  return Controller.extend( "fcl/EA/EA-System.RootComponent.controller.Master",
    {
      formatter: formatter,

      onInit: function() {

            console.log(this.getView())

      },

      onPressNavSub1: function() {
        this.getOwnerComponent()
          .getRouter()
          .navTo("sub1ComponentView", {
            viewPattern: "view1"
          });
      },
       

      onPressNavSub2: function() {
        this.getOwnerComponent()
          .getRouter()
          .navTo("sub2ComponentView", {
            viewPattern: "view1"
          });
      },
      onPressSystems: function() {
        console.log("hier bin ich Master Liste")
        this.getOwnerComponent()
          .getRouter()
          .navTo("SystemlistView", {
            viewPattern: "view1"
          });
      },
      onPressGroup: function() {
        console.log("hier bin ich Master Group")
        this.getOwnerComponent()
          .getRouter()
          .navTo("SystemGroupView", {
            viewPattern: "view1"
          });
      },
    
      onPressDataSystem: function() {
        console.log("hier bin ich Master Group View 2 ")
        this.getOwnerComponent()
          .getRouter()
          .navTo("SystemGroupView", {
            viewPattern: "view2"
          });
      },


      onCollapseExpandPress: function () {
        var oNavigationList = this.byId("navigationList");
        var bExpanded = oNavigationList.getExpanded();
  
        oNavigationList.setExpanded(!bExpanded);
      },
  
      onHideShowSubItemPress: function () {
        var oNavListItem = this.byId("subItemThree");
        oNavListItem.setVisible(!oNavListItem.getVisible());
      },
      handleClick: function () {
        console.log("hier bin ich")
        var oSideNavigation = this.getView().byId("sideNavigation");
        oSideNavigation.setCollapsed(!oSideNavigation.getCollapsed());
      },
  
      handleClickNav: function (oEvent) {
        console.log("hier bin ich")
        this.getOwnerComponent()
        .getRouter()
        .navTo("Component1", {
          viewPattern: "view1"
        });
        
      }
  
      
      
    }
  );
});
