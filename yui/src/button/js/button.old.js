// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_spreadsheet
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_spreadsheet-button
 */

/**
 * Atto text editor spreadsheet plugin.
 *
 * @namespace M.atto_spreadsheet
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_spreadsheet';
var FLAVORCONTROL = 'spreadsheet_flavor';
var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        FLAVORCONTROL: 'flavorcontrol'
    };

var TEMPLATE = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-left">' +
            '<label for="{{elementid}}_{{FLAVORCONTROL}}"><strong>{{get_string "enterflavor" component}}</strong></label>' +
            '<input type="radio" name="format" value="date1" checked>{{date1}}<br>' +
            '<input type="radio" name="format" value="date6">{{date6}}<br>' +
            '<p><strong>Time</strong></p>' +
            '<input type="radio" name="format" value="date4">{{date4}}<br>' +
            '<input type="radio" name="format" value="date5">{{date5}}<br>' +
            '<p><strong>Date</strong></p>' +
            '<input type="radio" name="format" value="date2">{{date2}}<br>' +
            '<input type="radio" name="format" value="date3">{{date3}}<br><br>' +
            '<button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button>' +
        '</div>' +
    '</form>';

Y.namespace('M.atto_spreadsheet').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

  
    /**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }
            // Add the spreadsheet icon/buttons
            this.addButton({
                icon: 'spreadsheet',
                iconComponent: 'atto_spreadsheet',
                buttonName: 'spreadsheet',
                callback: this._displayDialogue,
                callbackArgs: 'spreadsheet'
            });
        

    },

    /**
     * Get the id of the flavor control where we store the ice cream flavor
     *
     * @method _getFlavorControlName
     * @return {String} the name/id of the flavor form field
     * @private
     */
    _getFlavorControlName: function(){
        return(this.get('host').get('elementid') + '_' + FLAVORCONTROL);
    },

     /**
     * Display the spreadsheet Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon, date1) {
        e.preventDefault();
        var width=300;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
        //dialog doesn't detect changes in width without this
        //if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //append buttons to iframe
        var buttonform = this._getFormContent(clickedicon, date1);

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(clickedicon) {
        //var date1 = ''
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                FLAVORCONTROL: FLAVORCONTROL,
                component: COMPONENTNAME,
                defaultflavor: this.get('defaultflavor'),
                clickedicon: clickedicon,
                date1: Y.Date.format(new Date(), {format:"%x %X"}),
                date2: Y.Date.format(new Date(), {format:"%m/%d/%y"}),
                date3: Y.Date.format(new Date(), {format:"%Y/%m/%d"}),
                date4: Y.Date.format(new Date(), {format:"%l:%M:%S %p"}),
                date5: Y.Date.format(new Date(), {format:"%H:%M:%S"}),
                date6: Y.Date.format(new Date(), {format:"%Y/%m/%d %X"})
            }));
        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var value = Y.one("input[name=format]:checked").get("value");
        console.log(value);
        switch (value) {
            case "date1":
            format = Y.Date.format(new Date(), {format:"%x %l:%m:%S %p"});
            break;
            case "date2":
            format = Y.Date.format(new Date(), {format:"%m/%d/%y"});
            break;
            case "date3":
            format = Y.Date.format(new Date(), {format:"%Y/%m/%d"});
            break;
            case "date4":
            format = Y.Date.format(new Date(), {format:"%l:%M:%S %p"});
            break;
            case "date5":
            format = Y.Date.format(new Date(), {format:"%H:%M:%S"});
            break;
            case "date6":
            format = Y.Date.format(new Date(), {format:"%Y/%m/%d %X"});
            break;
        }

        Y.log(Y.Date.format(new Date(), {format:"%m/%d/%y %l:%m:%S %p"}));
        Y.log(Y.Date.format(new Date(), {format:"%m/%d/%y"}));
        Y.log(Y.Date.format(new Date(), {format:"%Y/%m/%d"}));
        Y.log(Y.Date.format(new Date(), {format:"%l:%M:%S %p"}));
        Y.log(Y.Date.format(new Date(), {format:"%H:%M:%S"}));
        Y.log(Y.Date.format(new Date(), {format:"%x %X"}));

        this.editor.focus();

        this.get('host').insertContentAtFocusPoint(format);
        this.markUpdated();

    }
}, { ATTRS: {
        disabled: {
            value: false
        },

        usercontextid: {
            value: null
        },

        defaultflavor: {
            value: ''
        }
    }
});
