var SelectedDishesViewController = function(view, model ) {
	model.getFullMenu().forEach(d => view.list.append('<li>'+d.name+'</li>'));
}
