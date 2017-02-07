var NavigationViewController = function(view, model ) {

	view.createNewDinnerButton.click(function(){
		// UNCOMMENT
		// model.removeAllDishes();
		// model.setNumberOfGuests(0);

		view.initialPage.hide();
		view.mainPage.show();
	});

	view.confirmButton.click(function() {
		view.mainPage.hide();
		view.overviewPage.show();
	});

	view.goBackButton.click(function() {
		view.overviewPage.hide();
		view.finalPage.hide();
		view.mainPage.show();
	});
}
