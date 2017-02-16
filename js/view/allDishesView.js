var AllDishesView = function (container) {
	this.searchKeywords = container.find('#searchKeywords')
	this.searchButton = container.find('#searchButton')
	this.searchFilter = container.find('#dishTypeFilter')
	this.clearSearchButton = container.find('#clearSearchButton')

	this.moreStartersButton = container.find('#starterDishes span')
	this.moreMainsButton = container.find('#mainDishes span')
	this.moreDessertsButton = container.find('#dessertDishes span')

	this.starterGrid = container.find('#starterDishes')
	this.mainGrid = container.find('#mainDishes')
	this.dessertGrid = container.find('#dessertDishes')
	this.searchResultsGrid = container.find('#searchResults')
	this.dishModals = container.find('#dishModals')
}
