var NavigationViewController = function(view, model ) {
	
	view.createNewDinnerButton.click(function(){
		view.initialPage.hide();
		view.mainPage.show();
	});
}
