import React from 'react';
import { Link } from "react-router-dom";
import './Accueil.css';
import {motion} from 'framer-motion'
 

export default class Accueil extends React.Component {
    
  render(){
    return(
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
    <section className="hero-container">
      <div className='texte-hero'>
      <h1>Les Meilleures bieres du Quebec</h1>
      <h3>Profiter de notre super rabais exclusif a l'instant!</h3>
      <h3>Jusqu'a 45% !</h3>
      <Link to='/liste'>Acheter maintenant!</Link></div>
    </section>
    
    <div className="newsletter">
        <h1>Inscrivez-vous a notre info lettre et profiter des meilleurs offres DUFF!</h1>
        Entrer votre email:<input type="text"></input>
        <br></br>
        <a href="#">S'inscrire</a>
       
      </div>
    </motion.div>
    
    )
      
     }


}