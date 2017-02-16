var AllDishesViewController = function(view, model) {
	 var addToGrid = function(dish, grid, modal) {
			var cardHtml = `
				<div id="dish-${dish.id}" class="col-lg-3 col-md-4 col-xs-6 thumbnail dish-card">
					<img class="img-responsive" src="${dish.image}" alt="" width="140" height="140">
					<div class="caption">
							<p><strong>${dish.name}</strong></p>
							<p>${shortDescription(dish.description)}</p>
							<p class="fade-buttons">
									<button type="button" class="btn btn-primary add-button">Add</button>
									<!-- Button trigger modal -->
									<button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal-${dish.id}">Recipe</button>
							</p>
					</div>
			</div>
			`
			var card = $(cardHtml);
			card.find('.add-button').click(() => model.addDishToMenu(dish.id));
			grid.append(card);
		}

		var createModal = function (dish, modalContainer) {
				var modalHtml = `
				<!-- Modal -->
				<div class="modal fade" id="myModal-${dish.id}" tabindex="-1" role="dialog">
						<div class="modal-dialog" role="document">
								<div class="modal-content">
										<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
												</button>
												<h4 class="modal-title" id="myModalLabel">${dish.name} recipe</h4>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-xs-12 col-md-4">
													<img class="img-responsive" src="${dish.image}" alt="">
												</div>
												<div class="col-xs-12 col-md-6">
													<h4>Preparation</h4>
													<p>${dish.description}</p>
													<h4>Ingredients</h4>
													<table class="ingredients-list">
														<tr>
															<th>Quantity</th>
															<th>Ingredient</th>
															<th>Price</th>
														</tr>
														${dish.ingredients.map(i => tableRow(i)).join('')}
													</table>
												</div>
											</div>
										</div>
										<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
												<button type="button" class="btn btn-primary add-button" data-dismiss="modal">Add</button>
										</div>
								</div>
						</div>
				</div>
				`
				var modal = $(modalHtml);
				modal.find('.add-button').click(() => model.addDishToMenu(dish.id));
				modalContainer.append(modal);
		}

		var update = function() {
			var keyword = view.searchKeywords.val();
			var type = view.searchFilter.val();
			if (keyword || type) {
				view.starterGrid.hide();
				view.mainGrid.hide();
				view.dessertGrid.hide();
				view.clearSearchButton.show();
				view.searchResultsGrid.empty();
				header = $(
					'<div class="col-lg-12">'+
					'<h3>Results</h3>'+
					'<span class="glyphicon loading glyphicon-refresh"></span>'+
					'</div>'
				)
				view.searchResultsGrid.append(header);
				view.searchResultsGrid.show();
				model.makeSearch(keyword, type, d => {
					addToGrid(d, view.searchResultsGrid)
					header.find('.loading').hide()
				}, console.log)
				// model.search(keyword, type).forEach(d => addToGrid(d, view.searchResultsGrid));
			} else {
				view.clearSearchButton.hide();
				view.searchResultsGrid.hide();
				view.starterGrid.show();
				view.mainGrid.show();
				view.dessertGrid.show();
			}
		}

		view.searchKeywords.keyup(function (e) {
			if (e.keyCode == 13 || view.searchKeywords.val()==0)
				update()
		})
		view.clearSearchButton.click(function () {
				view.searchKeywords.val('');
				view.searchFilter.val('');
				update();
		})
		view.searchButton.click(update)
		view.searchFilter.change(update)

		view.moreStartersButton.click(function(e) {
			$(e.target).addClass('loading disabled')
			model.getMoreByType('appetizer',
				d => {
					  addToGrid(d, view.starterGrid)
					  createModal(d, view.dishModals)
						$(e.target).removeClass('loading disabled')
				}, alert, 3)
		})

		view.moreMainsButton.click(function(e) {
			$(e.target).addClass('loading disabled')
			model.getMoreByType('main course',
				d => {
					  addToGrid(d, view.mainGrid)
					  createModal(d, view.dishModals)
						$(e.target).removeClass('loading disabled')
				}, alert, 3)
		})

		view.moreDessertsButton.click(function(e) {
			$(e.target).addClass('loading disabled')
			model.getMoreByType('dessert',
				d => {
					  addToGrid(d, view.dessertGrid)
					  createModal(d, view.dishModals)
						$(e.target).removeClass('loading disabled')
				}, alert, 3)
		})

		view.moreStartersButton.trigger('click')
		view.moreMainsButton.trigger('click')
		view.moreDessertsButton.trigger('click')
}

var shortDescription = function(text) {
	if(text.length<60){
		return text
	} else {
		return text.substring(0, 57) + '...'
	}
}

var tableRow = function(ingr) {
	return `
	<tr>
	<td>${ingr.quantity} ${ingr.unit}</td>
	<td>${ingr.name}</td>
	<td>SEK ${ingr.price.toFixed(2)}</td>
	</tr>
	`
}
