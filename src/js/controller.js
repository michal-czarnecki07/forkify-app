import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import bookmarksView from './views/bookmarksView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

const controlRecepies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    // LOAD RECIpE
    ResultsView.update(model.getResultsSearchPage());
    BookmarksView.update(model.state.bookmarks);
    await model.loadRecepie(id);
    //RENDER RECIPE
    RecipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    RecipeView.renderError();
  }
};

const controlSearchResuls = async function () {
  try {
    // get search query
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;
    //load search result
    await model.loadSearchResuls(query);
    // render results
    ResultsView.render(model.getResultsSearchPage());

    //render pagination buttons
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getResultsSearchPage(goToPage));

  //render pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  RecipeView.update(model.state.recipe);
};

const controlAddBookamrk = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  RecipeView.update(model.state.recipe);

  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe){
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC)
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message)
  }
}

const init = function () {
  RecipeView.addHandlerRender(controlRecepies);
  SearchView.addHandlerSearch(controlSearchResuls);
  PaginationView.addHandlerClick(controlPagination);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookamrk);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();


 const clearBookmarks = function(){
  localStorage.clear('bookmarks')
 }
//  clearBookmarks();