import { useContext } from "react";
import { AppContext } from "../context";

export default function Favorites() {

  const {favorites, selectMeal, removeFromFavorites} = useContext(AppContext);
  
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {
            favorites.map( (item) => {
              const {idMeal, strMealThumb:image} = item;
              return (
                <div key={idMeal} className="favorite-item">
                  <img src={image} onClick={() => selectMeal(idMeal, true)} className="favorites-img img" onClick={() => selectMeal(idMeal, true) }/>
                  <button className="remove-btn" onClick={ () => removeFromFavorites(idMeal)}>Remove</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}