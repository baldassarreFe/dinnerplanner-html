var PrintDishesViewController = function(view, model) {
	 this.addToGrid = function(dish, grid) {
			var cardHtml = `
			<tr>
					<td>
							<img src="${'images/' + dish.image}" alt="" width="140" height="140">
					</td>
					<td>
							<h1>${dish.name}</h1>
							<div>${dish.description}</div>
					</td>
					<td>
							<h2>Ingredients</h2>
							<ul>
							${dish.ingredients.map(i => '<li>'+i.name+'</li>').join('')}
							</ul>
					</td>
			</tr>
			`
			grid.append(cardHtml);
		}

		model.getFullMenu().forEach(d => this.addToGrid(d, view.printDishTable));
}
