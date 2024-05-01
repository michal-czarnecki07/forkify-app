import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }
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
    recipeView.renderError();
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
    // render results
    resultsView.render(model.getResultsSearchPage());

    //render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getResultsSearchPage(goToPage));

  //render pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecepies);
  searchView.addHandlerSearch(controlSearchResuls);
  paginationView.addHandlerClick(controlPagination);
};
init();
