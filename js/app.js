$(function() {
    // 1 Instantiate our model
    var model = new DinnerModel();

    // REMOVE
    model.setNumberOfGuests(3);
    model.addDishToMenu(1);
    model.addDishToMenu(102);

    // 2 Load views from the DOM
    var numberOfGuestsView = new NumberOfGuestsView($("#number-of-guests"));
    var navigationView = new NavigationView($("body"));
    var selectedDishesView = new SelectedDishesView($("#selectedDishesList"))

    // 3 Create view Controllers and attach them to their views
    var numberOfGuestsViewController = new NumberOfGuestsViewController(numberOfGuestsView,model)
    var navigationViewController = new NavigationViewController(navigationView,model);
    var selectedDishesViewController = new SelectedDishesViewController(selectedDishesView,model);
});
