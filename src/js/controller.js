import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2


if (module.hot){
  module.hot.accept()
}
///////////////////////////////////////
const controlRecepies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // LOAD RECIpE
    await model.loadRecepie(id);

    //RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError()
  }
};

const controlSearchResuls = async function () {
  try {

    // get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    //load search result
    await model.loadSearchResuls(query);
    console.log(model.state.search.results);

    resultsView.render(model.state.search.results)

  } catch (error) {
    console.log(error);

  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecepies);
  searchView.addHandlerSearch(controlSearchResuls)
};
init();