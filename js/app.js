$(function() {
    var apiKey = window.apiKey || window.prompt("Enter your Spoonacular API key")

    // 1 Instantiate our model
    var model = new DinnerModel(apiKey)

    // 2 Load views from the DOM
    var navigationView = new NavigationView($("body"))
    var sidePaneView = new SidePaneView($("#sidePaneView"))
    var allDishesView = new AllDishesView($("#allDishes"))
    var overviewDishesView = new OverviewDishesView($("#overview-page"))
    var printDishesView = new PrintDishesView($("#print-page"))

    // 3 Create view Controllers and attach them to their views
    var sidePaneViewController = new SidePaneViewController(sidePaneView,model)
    var allDishesViewController = new AllDishesViewController(allDishesView,model)
    var overviewDishesViewController = new OverviewDishesViewController(overviewDishesView,model)
    var printDishesViewController = new PrintDishesViewController(printDishesView,model)
    var navigationViewController = new NavigationViewController(navigationView,model)

    // Go straight to main view
    /* navigationView.createNewDinnerButton.click() */

    // Start with a menu (have to wait for the ajax requests to run)
    /* setTimeout(() => {
      model.setNumberOfGuests(3)
      model.addDishToMenu(model.localSearch(null, 'appetizer')[0].id)
      model.addDishToMenu(model.localSearch(null, 'main course')[0].id)
      model.addDishToMenu(model.localSearch(null, 'dessert')[0].id)
    }, 5000) */
})
