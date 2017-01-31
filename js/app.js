$(function() {
    // 1 Instantiate our model
    var model = new DinnerModel();

    // 2 Load views from the DOM
    var exampleView = new ExampleView($("#exampleView"));
    var navigationView = new NavigationView($("#navigation-view"));

    // 3 Create view Controllers and attach them to their views
    var exampleViewController = new ExampleViewController(exampleView,model)
    var navigationViewController = new NavigationViewController(navigationView,model);
});
