YUI.add("moodle-atto_spreadsheet-button",function(e,t){var n="atto_spreadsheet",r="spreadsheet_flavor",i={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",FLAVORCONTROL:"flavorcontrol"},s='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-left"><label for="sheetname"><strong>Sheet name</strong></label><input type="text" name="sheetname" id="sheetname" value=""><br/><label for="{{elementid}}_{{FLAVORCONTROL}}"><strong>{{get_string "enterflavor" component}}</strong></label><input type="checkbox" name="readonly" id="readonly" value="readonly" checked> Read-only<br/><input type="checkbox" name="groupaccess" id="groupaccess" value="groupaccess"> Group access<br/><input type="checkbox" name="math" id="math" value="math" checked> Math functions<br/><br/><button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button></div></form>';e.namespace("M.atto_spreadsheet").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(){if(this.get("disabled"))return;this.addButton({icon:"spreadsheet",iconComponent:"atto_spreadsheet",buttonName:"spreadsheet",callback:this._displayDialogue,callbackArgs:"spreadsheet"})},_getFlavorControlName:function(){return this.get("host").get("elementid")+"_"+r},_displayDialogue:function(t,r,i){t.preventDefault();var s=300,o=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:s+"px",focusAfterHide:r});o.width!==s+"px"&&o.set("width",s+"px");var u=this._getFormContent(r,i),a=e.Node.create("<div></div>");a.append(u),o.set("bodyContent",a),o.show(),this.markUpdated()},_getFormContent:function(t){var o=e.Handlebars.compile(s),u=e.Node.create(o({elementid:this.get("host").get("elementid"),CSS:i,FLAVORCONTROL:r,component:n,defaultflavor:this.get("defaultflavor"),clickedicon:t}));return this._form=u,this._form.one("."+i.INPUTSUBMIT).on("click",this._doInsert,this),u},_doInsert:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var n=this.get("userid"),r=e.one("#readonly").get("checked"),i=e.one("#math").get("checked"),s=e.one("#sheetname").get("value"),o='math="true"';i===!1&&(o='math="false"');var u='group="false"',a=e.one("#groupaccess").get("checked"),f=0;a===!0&&(u='group="true"',f=1);var l='readonly="true"';r===!1&&(l='readonly="false"');var c=new XMLHttpRequest,h=this;c.onreadystatechange=function(){return function(){if(c.readyState===4){var e=c.responseText;h.editor.focus(),sheet='<div class="eo_spreadsheet" sheet="'+e+'"></div>',console.log(sheet),h.get("host").insertContentAtFocusPoint(sheet),h.markUpdated();if(c.status===200){var t=c.responseText,n=t.indexOf("success<error>");if(n<1)return}}}}(this);var p="datatype=uploadfile";p+="&groupmode="+f,p+="&readonly="+r,p+="&pageurl="+encodeURI(document.URL),p+="&sheetname="+encodeURI(s),c.open("POST",M.cfg.wwwroot+"/lib/editor/atto/plugins/spreadsheet/dblib.php",!0),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.setRequestHeader("Cache-Control","no-cache"),c.setRequestHeader("Content-length",p.length),c.setRequestHeader("Connection","close"),c.send(p)}},{ATTRS:{disabled:{value:!1},userid:{value:""},usercontextid:{value:null},defaultflavor:{value:""}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin","datatype-date"]});
