var SidePaneViewController = function(view, model) {

	var updateNumberOfGuests = function(num) {
		view.numberOfGuests.val(model.getNumberOfGuests());
		view.numberOfGuests.text(model.getNumberOfGuests());
	}

	var updateSelectedList = function(sel, num) {
		view.list.empty();
		sel.forEach(d => {
				var listItemHtml =
				`
				<li>
					${d.name}
					<span class="badge pull-right remove-button">&#10005;</span>
					<span class="badge pull-right">${d.ingredients.map(i => i.price).reduce((a,b)=>a+b, 0) * num}</span>
				</li>
				`
				var listItem = $(listItemHtml);
				listItem.find('.remove-button').click(() => model.removeDishFromMenu(d.id));
				view.list.append(listItem);
			}
		);
	}

	var updateTotalPrice = function(tot) {
		view.totalPrice.text(tot);
	}

	model.addListener('numberOfGuestsChange', n => {
		updateNumberOfGuests(n);
		updateSelectedList(model.getFullMenu(), n);
		updateTotalPrice(model.getTotalMenuPrice());
	});

	model.addListener('selectedDishesChange', sel => {
		updateNumberOfGuests(model.getNumberOfGuests());
		updateSelectedList(sel, model.getNumberOfGuests());
		updateTotalPrice(model.getTotalMenuPrice());
	});

	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});

	updateNumberOfGuests(model.getNumberOfGuests());
}
