var AllDishesViewController = function(view, model) {
	model.getAllDishes('starter').forEach(d => addToGrid(d, view.starterGrid));
  model.getAllDishes('main dish').forEach(d => addToGrid(d, view.mainGrid));
  model.getAllDishes('dessert').forEach(d => addToGrid(d, view.dessertGrid));
}

var addToGrid = function(dish, grid) {
  var cardHtml = `
  <div id="dish-${dish.id}" class="col-lg-3 col-md-4 col-xs-6 thumbnail dish-card">
      <img class="img-responsive" src="${'images/' + dish.image}" alt="" width="140" height="140">
      <div class="caption">
          <h4>${dish.name}</h4>
          <p>${shortDescription(dish.description)}</p>
          <p class="fade-buttons">
              <button type="button" class="btn btn-primary">Add</button>
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal-${dish.id}">Recipe</button>
          </p>
          <!-- Modal -->
          <div class="modal fade" id="myModal-${dish.id}" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 class="modal-title" id="myModalLabel">${dish.name} recipe</h4>
                      </div>
                      <div class="modal-body">
                        <img class="img-responsive" src="${'images/' + dish.image}" alt="">
                        <p>${dish.description}</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Add</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `
  grid.append(jQuery.parseHTML(cardHtml));
}

var shortDescription = function(text) {
  if(text.length<60){
    return text
  } else {
    return text.substring(0, 57) + '...'
  }
}
