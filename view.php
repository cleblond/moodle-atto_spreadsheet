<?php
// --------------------------------------------------------- 
// block_cmanager is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// block_cmanager is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
//
// COURSE REQUEST MANAGER BLOCK FOR MOODLE
// by Kyle Goslin & Daniel McSweeney
// Copyright 2012-2014 - Institute of Technology Blanchardstown.
// --------------------------------------------------------- 
/**
 *
 * @package    atto_spreadsheet
 * @copyright  2014 onward Carl LeBlond
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
require_once("../../../../../config.php");

global $CFG, $USER, $DB;
//require_once("$CFG->libdir/formslib.php");
require_once('../../../../../course/lib.php');
//require_once($CFG->libdir.'/coursecatlib.php');
require_login();

/** Navigation Bar **/
//$PAGE->navbar->ignore_active();
//$PAGE->navbar->add(get_string('spreadmanDisplay', 'block_spreadman'));
//$PAGE->navbar->add('View Spreadsheet/Chart');
$PAGE->set_url('/lib/editor/atto/plugins/spreadsheet/view.php');
$context = context_system::instance();
$PAGE->set_context($context);
$courseid=optional_param('id',NULL,PARAM_INT);
$sheetid=optional_param('sheetid',NULL,PARAM_INT);
$chartid=optional_param('chartid',NULL,PARAM_INT);
$PAGE->set_pagelayout('popup');
//$PAGE->set_heading('View Spreadsheet');
$PAGE->set_title('title');
echo $OUTPUT->header();
//echo "sheetid=".$sheetid;
//echo "chartid=".$chartid;

if(isset($sheetid)){
require_once($CFG->dirroot . "/filter/spreadsheet/codebase/php/grid_cell_connector.php");
$result = $DB->get_record('filter_spreadsheet_sheet', array('sheetid'=>$sheetid));

		if($result->userid == $USER->id){

    			$script = '<script src="'.$CFG->wwwroot.'/filter/spreadsheet/codebase/spreadsheet.php?load=js"></script>';
            		$script .= '<link rel="stylesheet" href="'.$CFG->wwwroot.'/filter/spreadsheet/codebase/dhtmlx_core.css">
                       <link rel="stylesheet" href="'.$CFG->wwwroot.'/filter/spreadsheet/codebase/dhtmlxspreadsheet.css">
                       <link rel="stylesheet" href="'.$CFG->wwwroot.'/filter/spreadsheet/codebase/dhtmlxgrid_wp.css">';



            		$script .= '<script>window.onload = function() {
		        
			var dhx_sh1 = new dhtmlxSpreadSheet({
				load: "'.$CFG->wwwroot.'/filter/spreadsheet/codebase/php/data.php",
				save: "'.$CFG->wwwroot.'/filter/spreadsheet/codebase/php/data.php",
				parent: "gridobj",
				icons_path: "'.$CFG->wwwroot.'/filter/spreadsheet/codebase/imgs/icons/",
				math: true,
				autowidth: false,
				autoheight: false
			}); 
			dhx_sh1.load("'.$result->sheetid.'" , "'.$result->accesskey.'");
		        }
	                </script>
                        <div class="ssheet_cont" id="gridobj"></div>';

                        echo $script;
		}

}
