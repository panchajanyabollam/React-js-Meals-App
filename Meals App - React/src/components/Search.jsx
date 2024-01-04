import { useState, useContext } from "react";
import { AppContext } from "../context";


export default function Search() {
  
  const [text, setText] = useState('');

  const { setSearchTerm, fetchRandomMeal } = useContext(AppContext);


  function handleChange(e){
    setText(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(text){
      setSearchTerm(text);
    }
  }

  function handleRandomMeal(){
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type Favorite Meal" value={text} onChange={handleChange} className="form-input" />
        <button type="submit" className="btn" >Search</button>
        <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>Suprise Me!</button>
      </form>
    </header>
  )
}