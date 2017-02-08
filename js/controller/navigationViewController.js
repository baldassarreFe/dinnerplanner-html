var NavigationViewController = function(view, model ) {

	model.addListener('numberOfGuestsChange', n => {
		if (n==0 || model.getFullMenu()==0) {
			view.confirmButton.addClass('disabled');
		} else {
			view.confirmButton.removeClass('disabled');
		}
	});

	model.addListener('selectedDishesChange', sel => {
		if (sel.length==0 || model.getNumberOfGuests()==0) {
			view.confirmButton.addClass('disabled');
		} else {
			view.confirmButton.removeClass('disabled');
		}
	});

	view.createNewDinnerButton.click(function(){
		model.removeAllDishes();
		model.setNumberOfGuests(0);

		view.initialPage.hide();
		view.mainPage.show();
	});

	view.confirmButton.click(function() {
		view.mainPage.hide();
		view.overviewPage.show();
	});

	view.goBackButton.click(function() {
		view.overviewPage.hide();
		view.printPage.hide();
		view.mainPage.show();
	});

	view.printButton.click(function() {
		view.overviewPage.hide();
		view.printPage.show();
	});
}
