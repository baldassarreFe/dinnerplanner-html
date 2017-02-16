var OverviewDishesViewController = function(view, model) {
	 var updateSelectedGrid = function(sel, num) {
		 view.overviewCardGrid.empty();
		  sel.forEach(d => {
			var cardHtml = `
				<div id="dish-${d.id}" class="col-lg-3 col-md-4 col-xs-6 thumbnail dish-card col-centered">
					<img class="img-responsive" src="${d.image}" alt="" width="140" height="140">
					<div class="caption">
							<p><strong>${d.name}</strong></p>
							<p>${shortDescription(d.description)}</p>
							<p>Tot for ${num}: <span class="badge pull-right">${d.ingredients.map(i => i.price).reduce((a,b)=>a+b, 0) * num}</span></p>
							<p class="fade-buttons">
									<!-- Button trigger modal -->
									<button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal-overview-${d.id}">Recipe</button>
							</p>
							<!-- Modal -->
							<div class="modal fade" id="myModal-overview-${d.id}" tabindex="-1" role="dialog">
									<div class="modal-dialog" role="document">
											<div class="modal-content">
													<div class="modal-header">
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
																	<span aria-hidden="true">&times;</span>
															</button>
															<h4 class="modal-title" id="myModalLabel">${d.name} recipe</h4>
													</div>
													<div class="modal-body">
														<img class="img-responsive" src="${d.image}" alt="">
														<h4>Preparation</h4>
														<p>${d.description}</p>
														<h4>Ingredients</h4>
														<table class="ingredients-list">
															<tr>
															  <th>Quantity</th>
															  <th>Ingredient</th>
															  <th>Price</th>
															</tr>
															${d.ingredients.map(i => tableRow(i)).join('')}
														</table>
													</div>
													<div class="modal-footer">
															<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
													</div>
											</div>
									</div>
							</div>
					</div>
			</div>
			`
			view.overviewCardGrid.append(cardHtml);
		});
		}

		var updateNumberOfGuests = function(num) {
			view.numberOfGuests.val(model.getNumberOfGuests());
			view.numberOfGuests.text(model.getNumberOfGuests());
		}

		var updateTotalPrice = function(tot) {
			view.totalPrice.text(tot);
		}

		model.addListener('numberOfGuestsChange', n => {
			updateNumberOfGuests(n);
			updateSelectedGrid(model.getFullMenu(), n);
			updateTotalPrice(model.getTotalMenuPrice());
		});

		model.addListener('selectedDishesChange', sel => {
			updateNumberOfGuests(model.getNumberOfGuests());
			updateSelectedGrid(sel, model.getNumberOfGuests());
			updateTotalPrice(model.getTotalMenuPrice());
		});
}

var shortDescription = function(text) {
	if(text.length<49){
		return text
	} else {
		return text.substring(0, 46) + '...'
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
