/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.directives').directive('uiTinymce', ['ui.config', function (uiConfig) {
  uiConfig.tinymce = uiConfig.tinymce || {};
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ngModel) {
      var expression, onchanceCallback, handleEventCallback, setup,
        options = {};
      if (attrs.uiTinymce) {
        expression = scope.$eval(attrs.uiTinymce);
      } else {
        expression = {};
      }
      angular.extend(options, uiConfig.tinymce, expression);

      // Update model on button click
      onchanceCallback = options.onchange_callback || angular.noop;
      options.onchange_callback = function (inst) {
        if (inst.isDirty()) {
          inst.save();
          ngModel.$setViewValue(elm.val());
          if (!scope.$$phase)
            scope.$apply();
        }
        return onchanceCallback(inst);
      };

      // Update model on keypress
      handleEventCallback = options.handle_event_callback || function(){ /* Continue handling */ return true; };
      options.handle_event_callback = function (e) {
        if (this.isDirty()) {
          this.save();
          ngModel.$setViewValue(elm.val());
          if (!scope.$$phase)
            scope.$apply();
        }
        return handleEventCallback(e);
      };

      // Update model when calling setContent (such as from the source editor popup)
      setup = options.setup || angular.noop;
      options.setup = function (ed) {
        ed.onSetContent.add(function (ed, o) {
          if (ed.isDirty()) {
            ed.save();
            ngModel.$setViewValue(elm.val());
            if (!scope.$$phase)
              scope.$apply();
          }
        });
        return setup(ed);
      };

      setTimeout(function () {
        elm.tinymce(options);
      });
    }
  };
}]);
