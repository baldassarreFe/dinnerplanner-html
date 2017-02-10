var AllDishesViewController = function(view, model) {
	 var addToGrid = function(dish, grid, modal) {
			var cardHtml = `
				<div id="dish-${dish.id}" class="col-lg-3 col-md-4 col-xs-6 thumbnail dish-card">
					<img class="img-responsive" src="${'images/' + dish.image}" alt="" width="140" height="140">
					<div class="caption">
							<h4>${dish.name}</h4>
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
											<img class="img-responsive" src="${'images/' + dish.image}" alt="">
											<h4>Preparation</h4>
											<p>${dish.description}</p>
											<h4>Ingredients</h4>
											<table class="ingredients-list">
												<tr>
													<th>Quantity</th>
													<th>Ingredient</th>
													<th>Price</th>
												</tr>
												${dish.ingredients.map(i => tableRow(i))}
											</table>
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
				view.searchResultsGrid.append($('<h3 class="col-lg-12">Results</h3>'));
				model.search(keyword, type).forEach(d => addToGrid(d, view.searchResultsGrid));
				view.searchResultsGrid.show();
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
		view.searchButton.click(update)
		view.searchFilter.change(update)
		view.clearSearchButton.click(function () {
				view.searchKeywords.val('');
				view.searchFilter.val('');
				update();
		})

		// Populate menu sections (do once, will never change)
		model.getAllDishes('starter').forEach(d => addToGrid(d, view.starterGrid));
		model.getAllDishes('main dish').forEach(d => addToGrid(d, view.mainGrid));
		model.getAllDishes('dessert').forEach(d => addToGrid(d, view.dessertGrid));
		model.getAllDishes().forEach(d => createModal(d, view.dishModals))
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
	<td>SEK ${ingr.price}</td>
	</tr>
	`
}
