<?php
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

/**
 * structure settings.
 *
 * @package   atto_structure
 * @copyright  2014 onwards Carl LeBlond
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
global $CFG, $DB;

if (!isset($CFG)) {
    require_once("../../../../../config.php");
}

require_once($CFG->libdir . '/filelib.php');

$datatype  = optional_param('datatype', "", PARAM_TEXT);
$contextid = optional_param('contextid', 0, PARAM_INT);

$id = time();

$record = new stdClass();
$record->sheetid         = $id;
$record->key = '10000';
$lastinsertid = $DB->insert_record('atto_spreadsheet_sheet', $record, false);
