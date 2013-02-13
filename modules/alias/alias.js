/**
 * AliasProvider allows you to rapidly create a DSL
 *
 * @example
 * module.config(function(aliasProvider){
 *   aliasProvider.add('tabs', '<div bs-tabs></div>');
 * })
 */
angular.module('ui').config(function($provide){
	function aliasProvider() {
		this.add = function(alias, template, restrict) {
			restrict = restrict || 'E';
			angular.module('ui').directive(alias, function(){
				return {
					template: template,
					replace: true,
					transclude: true,
					restrict: restrict
				};
			});
		};
		this.$get = function() {
			return null;
		};
	}
	$provide.provider('aliasProvider', aliasProvider);
});