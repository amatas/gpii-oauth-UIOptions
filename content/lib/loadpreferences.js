var fluid_2_0 = fluid_2_0 || {};
(function ($, fluid) {
    "use strict";
	console.log("Checkpoint 1");
	
    fluid.defaults("fluid.loadpreferences", {
    	gradeNames: ["fluid.viewRelayComponent", "autoInit"],
        selectors: {
            load : ".flc-prefsEditor-load"
    	},
    	listeners: {
            "onCreate.bindClick": {
                "this": "{that}.dom.load",
                "method": "click",
                "args": ["{that}.openwindow"]
            }
    	},
    	invokers: {
    		openwindow: {
                funcName: "fluid.loadpreferences.openwindow",
                args: ["{that}"]
            }
    	}
	});

    fluid.loadpreferences.openwindow = function (that) {
         window.open("http://localhost:8000/preferences");
    };
})(jQuery, fluid_2_0);
