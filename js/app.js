$(function() {
    // 1 Instantiate our model
    var model = new DinnerModel();
    // REMOVE
		model.setNumberOfGuests(3);
		model.addDishToMenu(1);
		model.addDishToMenu(104);

    // 2 Load views from the DOM
    var navigationView = new NavigationView($("body"));
    var sidePaneView = new SidePaneView($("#sidePaneView"));
    var allDishesView = new AllDishesView($("#allDishes"))
    var overviewDishesView = new OverviewDishesView($("#overview-page"))
    var printDishesView = new PrintDishesView($("#print-page"))

    // 3 Create view Controllers and attach them to their views
    var navigationViewController = new NavigationViewController(navigationView,model);
    var sidePaneViewController = new SidePaneViewController(sidePaneView,model);
    var allDishesViewController = new AllDishesViewController(allDishesView,model);
    var overviewDishesViewController = new OverviewDishesViewController(overviewDishesView,model);
    var printDishesViewController = new PrintDishesViewController(printDishesView,model);

    // REMOVE
    //navigationView.createNewDinnerButton.trigger('click');
});
