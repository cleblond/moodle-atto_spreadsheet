YUI.add("moodle-atto_spreadsheet-button",function(e,t){var n="atto_spreadsheet",r="spreadsheet_flavor",i={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",FLAVORCONTROL:"flavorcontrol"},s='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-left"><label for="sheetname"><strong>Sheet name</strong></label><input type="text" name="sheetname" id="sheetname" value=""><br/><label for="{{elementid}}_{{FLAVORCONTROL}}"><strong>{{get_string "enteroptions" component}}</strong></label><input type="checkbox" name="readonly" id="readonly" value="readonly" checked> Read-only<br/><input type="checkbox" name="groupaccess" id="groupaccess" value="groupaccess"> Group access<br/><input type="checkbox" name="math" id="math" value="math" checked> Math functions<br/><br/><button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button></div></form>',o='<iframe src="http://desktop/moodle28/lib/editor/atto/plugins/spreadsheet/view.php?sheetid={{sheetid}}"width="760" height="510" scrolling="no" frameBorder="0" ></iframe>';e.namespace("M.atto_spreadsheet").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_selectedImage:null,initializer:function(){if(this.get("disabled"))return;this.addButton({icon:"spreadsheet",iconComponent:"atto_spreadsheet",buttonName:"spreadsheet",callback:this._displayDialogue,tags:"div",callbackArgs:"spreadsheet"}),this.editor.delegate("dblclick",this._displaySpreadsheet,".eo_spreadsheet",this)},_handleSpreadsheetClick:function(e){var t=e.target,n=this.get("host").getSelectionFromNode(t);this.get("host").getSelection()!==n&&this.get("host").setSelection(n)},_displaySpreadsheet:function(t){var r=t.target,i=r.get("className"),s=i.split(" ");this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var o=this.getDialogue({width:"auto",focusAfterHide:!0});o.setStdModContent(e.WidgetStdMod.HEADER,M.util.get_string("viewspreadsheet",n)),o.set("bodyContent",this._getSpreadsheetContent(s[1])).show()},_getSpreadsheetContent:function(t){var r=e.Handlebars.compile(o),s=e.Node.create(r({elementid:this.get("host").get("elementid"),CSS:i,sheetid:t,component:n}));return this._form=s,s},_displayDialogue:function(t,r,i){t.preventDefault();var s=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:"auto",focusAfterHide:r}),o=this._getFormContent(r,i),u=e.Node.create("<div></div>");u.append(o),s.setStdModContent(e.WidgetStdMod.HEADER,M.util.get_string("dialogtitle",n)),s.set("bodyContent",u),s.show(),this.markUpdated()},_getFormContent:function(t){var o=e.Handlebars.compile(s),u=e.Node.create(o({elementid:this.get("host").get("elementid"),CSS:i,FLAVORCONTROL:r,component:n,defaultflavor:this.get("defaultflavor"),clickedicon:t}));return this._form=u,this._form.one("."+i.INPUTSUBMIT).on("click",this._doInsert,this),u},_doInsert:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var n=e.one("#readonly").get("checked"),r=e.one("#math").get("checked"),i=e.one("#sheetname").get("value"),s='math="true"';r===!1&&(s='math="false"');var o='group="false"',u=e.one("#groupaccess").get("checked"),a=0;u===!0&&(o='group="true"',a=1);var f='readonly="true"';n===!1&&(f='readonly="false"');var l=new XMLHttpRequest,c=this;l.onreadystatechange=function(){return function(){if(l.readyState===4){var e=l.responseText;c.editor.focus(),sheet='<div class="eo_spreadsheet '+e+'"></div>',c.get("host").insertContentAtFocusPoint(sheet),c.markUpdated();if(l.status===200){var t=l.responseText,n=t.indexOf("success<error>");if(n<1)return}}}}(this);var h="datatype=uploadfile";h+="&groupmode="+a,h+="&readonly="+n,h+="&pageurl="+encodeURI(document.URL),h+="&sheetname="+encodeURI(i),l.open("POST",M.cfg.wwwroot+"/lib/editor/atto/plugins/spreadsheet/dblib.php",!0),l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.setRequestHeader("Cache-Control","no-cache"),l.setRequestHeader("Content-length",h.length),l.setRequestHeader("Connection","close"),l.send(h)}},{ATTRS:{disabled:{value:!1},userid:{value:""},usercontextid:{value:null},defaultflavor:{value:""}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin","datatype-date"]});
