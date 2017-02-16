$(function() {
    var apiKey = window.prompt("Enter your Spoonacular API key")

    // 1 Instantiate our model
    var model = new DinnerModel(apiKey);

    // 2 Load views from the DOM
    var navigationView = new NavigationView($("body"));
    var sidePaneView = new SidePaneView($("#sidePaneView"));
    var allDishesView = new AllDishesView($("#allDishes"))
    var overviewDishesView = new OverviewDishesView($("#overview-page"))
    var printDishesView = new PrintDishesView($("#print-page"))

    // 3 Create view Controllers and attach them to their views
    var sidePaneViewController = new SidePaneViewController(sidePaneView,model);
    var allDishesViewController = new AllDishesViewController(allDishesView,model);
    var overviewDishesViewController = new OverviewDishesViewController(overviewDishesView,model);
    var printDishesViewController = new PrintDishesViewController(printDishesView,model);
    var navigationViewController = new NavigationViewController(navigationView,model);

    // REMOVE
    navigationView.createNewDinnerButton.click();
});
