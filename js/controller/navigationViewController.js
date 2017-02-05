var NavigationViewController = function(view, model ) {
	
	view.createNewDinnerButton.click(function(){
		model.removeAllDishes();
		model.setNumberOfGuests(0);

		// REMOVE
		model.setNumberOfGuests(3);
		model.addDishToMenu(1);
		model.addDishToMenu(102);

		view.initialPage.hide();
		view.mainPage.show();
	});
}
