$(function() {
    // 1 Instantiate our model
    var model = new DinnerModel();
    // REMOVE
		model.setNumberOfGuests(3);
		model.addDishToMenu(1);
		model.addDishToMenu(104);

    // 2 Load views from the DOM
    var numberOfGuestsView = new NumberOfGuestsView($(".number-of-guests-view"));
    var navigationView = new NavigationView($("body"));
    var selectedDishesView = new SelectedDishesView($("#selectedDishesView"));
    var allDishesView = new AllDishesView($("#allDishes"))

    // 3 Create view Controllers and attach them to their views
    var navigationViewController = new NavigationViewController(navigationView,model);
    var selectedDishesViewController = new SelectedDishesViewController(selectedDishesView,model);
    var numberOfGuestsViewController = new NumberOfGuestsViewController(numberOfGuestsView,model);
    var allDishesViewController = new AllDishesViewController(allDishesView,model);

    // REMOVE
    //navigationView.createNewDinnerButton.trigger('click');
});
