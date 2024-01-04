import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext('');

const allMealsUrl = 'https://' + 'www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://' + 'www.themealdb.com/api/json/v1/1/random.php';

function getFavoritesFromLocal(){
  let favorites = localStorage.getItem('favorites');
  if(favorites){
      favorites = JSON.parse(favorites);
  }
  else{
    favorites = [];
  }

  return favorites;
}


const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocal())


  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url)

      if(data.meals){
        setMeals(data.meals);
      }
      else{
        setMeals([])
      }
      
    }
    catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  }

  function fetchRandomMeal(){
    fetchMeals(randomMealUrl);
  }

  useEffect( () => {
    fetchMeals(allMealsUrl);
  },[])
  
  useEffect(() => {
    if(!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  function selectMeal(idMeal, favoriteMeal){
    let meal;
    if(favoriteMeal){
      meal = favorites.find( (meal) => meal.idMeal == idMeal);
    }
    else{
      meal = meals.find( (meal) => meal.idMeal == idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }
  
  function closeModal(){
    setShowModal(false);
  }

  function addToFavorites(idMeal){
    const meal = meals.find( (meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find( (meal) => meal.idMeal === meal);
    if(alreadyFavorite){
      return;
    }
    const updatedFavorites = [...favorites, meal];
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  function removeFromFavorites(idMeal){
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }
  

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal , showModal, selectMeal, selectedMeal, closeModal, addToFavorites,removeFromFavorites, favorites }}>
      {children}
    </AppContext.Provider>
  )

}

// export default function useGlobalContext(){
//   return useContext(AppContext);
// }

export { AppContext, AppProvider }