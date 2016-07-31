"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver( path.basename(__dirname), {
	//debug: true,
	capabilities: {

				'onoff': {
					'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
					'command_get'				: 'SWITCH_MULTILEVEL_GET',
					'command_set'				: 'SWITCH_MULTILEVEL_SET',
					'command_set_parser'		: function( value ){
						return {
							'Value': value
						}
					},
				'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
				'command_report_parser'		: function( report ){
					if( typeof report['Value'] === 'string' ) {
							return report['Value'] === 'on/enable';
						} else {
							return report['Value (Raw)'][0] > 0;
						}
					},
				},

				'dim': {
					'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
					'command_get'				: 'SWITCH_MULTILEVEL_GET',
					'command_set'				: 'SWITCH_MULTILEVEL_SET',
					'command_set_parser'		: function( value ){
						return {
							'Value': value * 100
						}
					},
					'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
					'command_report_parser'		: function( report ){
						if( typeof report['Value'] === 'string' ) {
							return ( report['Value'] === 'on/enable' ) ? 1.0 : 0.0;
						} else {
							return report['Value (Raw)'][0] / 100;
						}
					},
				},
			},

		settings: {
			"Input_1_type": {
			"index": 1,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Input_2_contact_type": {
			"index": 2,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Input_3_contact_type": {
			"index": 3,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Deactivate/Activate_ALL_ON_/_ALL_OFF": {
			"index": 10,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"State_of_device_after_power_failure": {
			"index": 30,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ ( input === true ) ? 1 : 0 ]);
				}
			},
			"Power_report_on_power_change": {
			"index": 40,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Power_report_by_time_interval": {
			"index": 42,
			"size": 2,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Maximum_dimming_value": {
			"index": 61,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Minimum_dimming_value": {
			"index": 60,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Dimming_time_(soft_on/off)": {
			"index": 65,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Dimming_time_when_key_pressed": {
			"index": 66,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			}
		}
})