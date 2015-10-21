// MyPreferences

var fluid = fluid_2_0 = fluid_2_0_0_beta_1 || {};
(function ($, fluid) {
    "use strict";
	
    fluid.defaults("fluid.loadpreferences", {
    	gradeNames: ["fluid.viewRelayComponent"],
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
                args: ["{prefsEditor}"]
            }
    	}
	});

    fluid.loadpreferences.openwindow = function (that) {
    	window.open("http://localhost:8000/preferences");
    };

    fluid.defaults("fluid.preferencesCallback",{
        gradeNames: ["fluid.eventedComponent"],
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


    fluid.defaults("fluid.prefs.auxSchema.alf", {
        gradeNames: ["fluid.prefs.auxSchema"],
        auxiliarySchema: {
            "loaderGrades": ["fluid.prefs.separatedPanel", "fluid.loadpreferences" ],
            "namespace": "fluid.prefs.constructed", // The author of the auxiliary schema will provide this and will be the component to call to initialize the constructed PrefsEditor.
            "terms": {
                "templatePrefix": "../../framework/preferences/html",  // Must match the keyword used below to identify the common path to settings panel templates.
                "messagePrefix": "../../framework/preferences/messages"  // Must match the keyword used below to identify the common path to message files.
            },
            "template": "%templatePrefix/SeparatedPanelPrefsEditor.html",
            "message": "%messagePrefix/prefsEditor.json",
            "textSize": {
                "type": "fluid.prefs.textSize",
                "enactor": {
                    "type": "fluid.prefs.enactor.textSize"
                },
                "panel": {
                    "type": "fluid.prefs.panel.textSize",
                    "container": ".flc-prefsEditor-text-size",  // the css selector in the template where the panel is rendered
                    "template": "%templatePrefix/PrefsEditorTemplate-textSize.html",
                    "message": "%messagePrefix/textSize.json"
                }
            },
            "lineSpace": {
                "type": "fluid.prefs.lineSpace",
                "enactor": {
                    "type": "fluid.prefs.enactor.lineSpace",
                    "fontSizeMap": {
                        "xx-small": "9px",
                        "x-small": "11px",
                        "small": "13px",
                        "medium": "15px",
                        "large": "18px",
                        "x-large": "23px",
                        "xx-large": "30px"
                    }
                },
                "panel": {
                    "type": "fluid.prefs.panel.lineSpace",
                    "container": ".flc-prefsEditor-line-space",  // the css selector in the template where the panel is rendered
                    "template": "%templatePrefix/PrefsEditorTemplate-lineSpace.html",
                    "message": "%messagePrefix/lineSpace.json"
                }
            },
            "textFont": {
                "type": "fluid.prefs.textFont",
                "classes": {
                    "default": "",
                    "times": "fl-font-times",
                    "comic": "fl-font-comic-sans",
                    "arial": "fl-font-arial",
                    "dyslexic": "fl-font-dyslexic",
                    "verdana": "fl-font-verdana"
                },
                "enactor": {
                    "type": "fluid.prefs.enactor.textFont",
                    "classes": "@textFont.classes"
                },
                "panel": {
                    "type": "fluid.prefs.panel.textFont",
                    "container": ".flc-prefsEditor-text-font",  // the css selector in the template where the panel is rendered
                    "classnameMap": {"textFont": "@textFont.classes"},
                    "template": "%templatePrefix/PrefsEditorTemplate-textFont.html",
                    "message": "%messagePrefix/textFont.json"
                }
            },
            "contrast": {
                "type": "fluid.prefs.contrast",
                "classes": {
                    "default": "fl-theme-prefsEditor-default",
                    "bw": "fl-theme-prefsEditor-bw fl-theme-bw",
                    "wb": "fl-theme-prefsEditor-wb fl-theme-wb",
                    "by": "fl-theme-prefsEditor-by fl-theme-by",
                    "yb": "fl-theme-prefsEditor-yb fl-theme-yb",
                    "lgdg": "fl-theme-prefsEditor-lgdg fl-theme-lgdg"

                },
                "enactor": {
                    "type": "fluid.prefs.enactor.contrast",
                    "classes": "@contrast.classes"
                },
                "panel": {
                    "type": "fluid.prefs.panel.contrast",
                    "container": ".flc-prefsEditor-contrast",  // the css selector in the template where the panel is rendered
                    "classnameMap": {"theme": "@contrast.classes"},
                    "template": "%templatePrefix/PrefsEditorTemplate-contrast.html",
                    "message": "%messagePrefix/contrast.json"
                }
            },
            "emphasizeLinks": {
                "type": "fluid.prefs.emphasizeLinks",
                "enactor": {
                    "type": "fluid.prefs.enactor.emphasizeLinks",
                    "cssClass": "fl-link-enhanced"
                },
                "panel": {
                    "type": "fluid.prefs.panel.emphasizeLinks",
                    "container": ".flc-prefsEditor-emphasizeLinks",  // the css selector in the template where the panel is rendered
                    "template": "%templatePrefix/PrefsEditorTemplate-emphasizeLinks.html",
                    "message": "%messagePrefix/emphasizeLinks.json"
                }
            },
            "inputsLarger": {
                "type": "fluid.prefs.inputsLarger",
                "enactor": {
                    "type": "fluid.prefs.enactor.inputsLarger",
                    "cssClass": "fl-text-larger"
                },
                "panel": {
                    "type": "fluid.prefs.panel.inputsLarger",
                    "container": ".flc-prefsEditor-inputsLarger",  // the css selector in the template where the panel is rendered
                    "template": "%templatePrefix/PrefsEditorTemplate-inputsLarger.html",
                    "message": "%messagePrefix/inputsLarger.json"
                }
            },
            groups: {
                "linksControls": {
                    "container": ".flc-prefsEditor-links-controls",
                    "template": "%templatePrefix/PrefsEditorTemplate-linksControls.html",
                    "message": "%messagePrefix/linksControls.json",
                    "type": "fluid.prefs.panel.linksControls",
                    "panels": ["emphasizeLinks", "inputsLarger"]
                }
            }
        }
    });

    // Gradename to invoke "fluid.uiOptions.prefsEditor"
    fluid.prefs.builder({
        gradeNames: ["fluid.prefs.auxSchema.alf"]
    });

    fluid.defaults("fluid.uiOptions.prefsEditor", {
        gradeNames: ["fluid.prefs.constructed.prefsEditor"]
    });



})(jQuery, fluid_2_0);