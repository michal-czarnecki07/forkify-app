import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2



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
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecepies));
