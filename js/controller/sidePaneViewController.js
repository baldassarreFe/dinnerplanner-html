var SidePaneViewController = function(view, model) {

	this.addToList = function(dish){
		view.list.append(
			`
			<li>
				${dish.name}
				<span class="badge pull-right" style='background-color:red'>&#10005;</span>
				<span class="badge pull-right">${dish.ingredients.map(i => i.price).reduce((a,b)=>a+b) * model.getNumberOfGuests()}</span>
			</li>
			`
		)
	}

	model.getFullMenu().forEach(d => this.addToList(d));

	view.totalPrice.text(model.getTotalMenuPrice());

	// REMOVE
	view.numberOfGuests.val(model.getNumberOfGuests());
	view.numberOfGuests.text(model.getNumberOfGuests());

	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});

	if (model.getFullMenu().length==0) {
		view.confirmButton.addClass('disabled');
	} else {
		view.confirmButton.removeClass('disabled');
	}
}
