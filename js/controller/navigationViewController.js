var NavigationViewController = function(view, model ) {

	view.createNewDinnerButton.click(function(){
		// UNCOMMENT
		// model.removeAllDishes();
		// model.setNumberOfGuests(0);

		view.initialPage.hide();
		view.mainPage.show();
	});
}
