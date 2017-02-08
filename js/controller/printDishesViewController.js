var PrintDishesViewController = function(view, model) {
	var updateSelectedTable = function(sel, num) {
 		 view.selectedDishTable.empty();
 		  sel.forEach(dish => {
 			var tableRow = `
			<tr>
					<td>
							<img src="${'images/' + dish.image}" alt="" width="140" height="140">
					</td>
					<td>
							<h2>${dish.name}</h2>
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
 			view.selectedDishTable.append(tableRow);
 		});
 		}

		var updateNumberOfGuests = function(num) {
			view.numberOfGuests.val(model.getNumberOfGuests());
			view.numberOfGuests.text(model.getNumberOfGuests());
		}

		model.addListener('numberOfGuestsChange', n => {
			updateNumberOfGuests(n);
			updateSelectedTable(model.getFullMenu(), n);
		});

		model.addListener('selectedDishesChange', sel => {
			updateNumberOfGuests(model.getNumberOfGuests());
			updateSelectedTable(sel, model.getNumberOfGuests());
		});
}
