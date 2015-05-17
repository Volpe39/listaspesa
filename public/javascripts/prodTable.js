(function(){
	var app = angular.module('prodtable-mod', ['ngResource']);

	app.factory('dbRead', function($resource){
		return $resource('/data/productlist');
	});

	app.factory('dbWrite', function($resource){
		return $resource('/data/addproduct');
	});

	app.factory('dbDelete', function($resource){
		return $resource('/data/delproduct/:_id');
	});

	app.factory('dbUpdate', function($resource){
		return $resource('/data/updproduct/:_id');
	});

	app.directive('prodTable', function(){
		return {
			restrict : 'E',
			templateUrl : './html/partials/prod-table.html',
			controller: function(dbRead, dbWrite, dbDelete, dbUpdate){
				this.productList;
				this.refreshTable = function(){
					this.productList=dbRead.query();
				};
				this.newProdotto;
				this.addProdotto = function(){
					var newProductJSON = {
						'nome': this.newProdotto.nome,
						'note': this.newProdotto.note,
						'utente': this.newProdotto.utente,
						'data': Date.now()
					};
					dbWrite.save(newProductJSON);
					this.refreshTable();
					this.newProdotto = {};
				};
				this.delProdotto = function(id){
					console.log("Hai selezionato l'elemento numero: "+id );
					var id = this.productList[id]._id;
					dbDelete['delete']({'_id': id});
					this.refreshTable();
				};
				this.updProdotto = function(id){
					var id = this.newProdotto._id;
					dbUpdate.save({'_id': id}, {'updates' : {
						'nome': this.newProdotto.nome,
						'note': this.newProdotto.note,
						'utente': this.newProdotto.utente,
						'data': Date.now()
					}});
					this.refreshTable();
					this.newProdotto = {};
					$("input[id='AddUpd']").prop("value","Nuovo prodotto");
					this.choseUpdAdd = 0;
				};
				this.choseUpdAdd = 0;
				this.fill4update = function(id){
					this.newProdotto = this.productList[id];
					this.choseUpdAdd = 1;
					$("input[id='AddUpd']").prop("value","Modifica prodotto");
				};
				this.updORadd = function(){
					if (this.choseUpdAdd == 0){
						this.addProdotto();
					}
					if (this.choseUpdAdd == 1){
						this.updProdotto();
					}
				}
			},
			controllerAs: 'prTab'
		};
	});
})();