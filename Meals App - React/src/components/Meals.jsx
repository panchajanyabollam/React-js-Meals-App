import { useContext } from "react";
import { AppContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

export default function Meals() {
  
  const { meals , loading, selectMeal, addToFavorites } = useContext(AppContext);

  if(loading){
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )  
  }
  if(meals.length < 1){
    return (
      <section className="section">No Meals Matched your Search. Please Try Again!</section>
    )
  }
  return (
    <section className="section-center">
      {
        meals.map((singleMeal) => {

          const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

          return <article key={idMeal} className="single-meal" onClick={ () => selectMeal(idMeal)}>
            <img src={image} className="img" />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn" onClick={ () => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
            </footer>
          </article>
        })
      }
    </section>
  )
}