var AllDishesView = function (container) {
	this.searchKeywords = container.find('#searchBar.searchInput')
	this.searchButton = container.find('#searchBar.searchButton')
	this.searchFilter = container.find('#searchBar.dishTypeFilter')
	this.starterGrid = container.find('#starterDishes')
	this.mainGrid = container.find('#mainDishes')
	this.dessertGrid = container.find('#dessertDishes')
}
