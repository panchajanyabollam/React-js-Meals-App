import * as React from 'react';
import './App.css';
import Favorites from './components/Favorites.jsx';
import Search from './components/Search.jsx';
import Modal from './components/Modal.jsx';
import Meals from './components/Meals.jsx';
import {useContext} from "react";
import { AppContext } from "./context";

function App() {
  
  const {showModal, favorites} = useContext(AppContext);
  
  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;