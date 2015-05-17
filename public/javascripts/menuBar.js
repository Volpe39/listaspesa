(function(){
	var app = angular.module('menubar-mod', []);
	app.directive('menuBar', function(){
		return {
			restrict : 'E',
			templateUrl : './html/partials/menu-bar.html',
			controller: function(){
				this.menuElements;
				this.getSession = function(){
					console.log('getSession()');
					//metodi per recuperare la session e caricare gli elementi giusti
					this.menuElements = [
						{'nome' : 'Lista della Spesa', 'url' : '#'}
						//{'nome' : 'Pannello Utente', 'url' : '#'},
						//{'nome' : 'Login', 'url' : '#'},
					];
				};
			},
			controllerAs: 'menu'
		};
	});
})();