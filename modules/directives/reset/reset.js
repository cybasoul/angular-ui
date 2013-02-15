/**
 * Add a clear button to form inputs to reset their value
 */
angular.module('ui.directives').directive('uiReset', ['ui.config', function (uiConfig) {
  var resetValue = null;
  if (uiConfig.reset !== undefined)
      resetValue = uiConfig.reset;
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var aElement, linkResetValue, resetWrap;
      if (attrs.uiReset) {
        scope.$watch(attrs.uiReset, function(newVal){
          linkResetValue = newVal;
          elm.toggleClass('ui-resettable', linkResetValue === ctrl.$modelValue);
        });
      } else {
        linkResetValue = resetValue;
      }
      aElement = angular.element('<a class="ui-reset" />');
      elm.wrap('<span class="ui-resetwrap" />').after(aElement);
      aElement.bind('click', function (e) {
        e.preventDefault();
        scope.$apply(function () {
          ctrl.$setViewValue(linkResetValue);
          ctrl.$render();
        });
      });
      resetWrap = elm.parent('.ui-resetwrap');
      scope.$watch(attrs.ngModel, function(newVal){
        elm.toggleClass('ui-resettable', linkResetValue === newVal);
      });
    }
  };
}]);
