var fluid_2_0 = fluid_2_0 || {};
(function ($, fluid) {
    "use strict";
	
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
                funcName: "fluid.loadpreferences.openwindow"
            }
    	}
	});

    fluid.loadpreferences.openwindow = function () {
        window.open("http://localhost:8000/preferences");
    };

    fluid.defaults("fluid.preferencesCallback",{
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        invokers: {
            setpreferences: {
                funcName: "fluid.loadpreferences.setapreferences",
                args: ["{that}"]
            }
        }
    });
    fluid.loadpreferences.setapreferences = function (model) {
        window.console.log(model);
    }
})(jQuery, fluid_2_0);
