/*
 * Defines the ui-if tag. This removes/adds an element from the dom depending on a condition
 * Originally created by @tigbro, for the @jquery-mobile-angular-adapter
 * https://github.com/tigbro/jquery-mobile-angular-adapter
 */
angular.module('ui.directives').directive('uiIf', [function () {
  return {
    transclude: 'element',
    priority: 1000,
    terminal: true,
    restrict: 'A',
    compile: function (element, attr, transclude) {
      return function (scope, element, attr) {

        var childElement;
        var childScope;
        var last = null;
 
        scope.$watch(attr['uiIf'], function (newValue) {
          if (!!newValue === last) return; // needs === to be sure first pass renders

          last = !!newValue;

          if (newValue) {
            childScope = scope.$new();
            transclude(childScope, function (clone) {
              childElement = clone;
              element.after(clone);
            });
          } else {
            if (childElement)
              childElement.remove();
            if (childScope)
              childScope.$destroy();
            childScope = childElement = undefined;
          }
        });
      };
    }
  };
}]);