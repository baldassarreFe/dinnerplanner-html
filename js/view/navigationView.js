var NavigationView = function (container) {
	// Pages
	this.initialPage = container.find("#initial-page");
	this.createNewDinnerButton = this.initialPage.find(".btn");
	this.mainPage = container.find("#main-page");
	this.overviewPage = container.find("#overview-page");
	this.printPage = container.find("#print-page");

	// Navigation Buttons
	this.confirmButton = container.find("#dinnerOverview > button");
	this.goBackButton = container.find(".go-back-button");
	this.printButton = container.find("#print-button");
}
