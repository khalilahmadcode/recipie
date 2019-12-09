import React, {useEffect, useState}from 'react';
import './App.css';
import Recipe from './Recipe.js';

function App() {

  const App_ID = "9b08ff5f";
  const APP_KEY = "ea0943ae84aac5877cc24be82220419b";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState("chicken")

  // Effect Hook 
  useEffect (() => {
    getRecipe();
  }, [query]); 


  const getRecipe = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`); 
      const data = await response.json(); 
      setRecipes(data.hits); 
      console.log(data); 
    }catch(e){
      console.log("failed to laod data");
    }
   
  }

  const updateSearch = e => {
    setSearch(e.target.value); 
    console.log(e.target.value); 
  }

  const gerSearch = e => {
    e.preventDefault(); 
    if(search !== "") {
      setQuery(search); 
    }
    setSearch('');
  }


  return (
    <div className="App container">
      <form className="search-form" onSubmit={gerSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type='submit' className="search-button">Search</button>
      </form>

      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image = {recipe.recipe.image} 
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
