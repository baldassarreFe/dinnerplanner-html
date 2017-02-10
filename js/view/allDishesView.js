var AllDishesView = function (container) {
	this.searchKeywords = container.find('#searchKeywords')
	this.searchButton = container.find('#searchButton')
	this.searchFilter = container.find('#dishTypeFilter')
	this.clearSearchButton = container.find('#clearSearchButton')

	this.starterGrid = container.find('#starterDishes')
	this.mainGrid = container.find('#mainDishes')
	this.dessertGrid = container.find('#dessertDishes')
	this.searchResultsGrid = container.find('#searchResults')
	this.dishModals = container.find('#dishModals')
}
