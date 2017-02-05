var SelectedDishesViewController = function(view, model ) {
	this.addToList = function(dish){
		view.list.append(`<li>${dish.name}<span class="badge pull-right">${dish.ingredients.map(i => i.price).reduce((a,b)=>a+b) * model.getNumberOfGuests()}</span></li>`)
	}

	model.getFullMenu().forEach(d => this.addToList(d));
	view.totalPrice.text(model.getTotalMenuPrice());
}
