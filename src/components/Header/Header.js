import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';
import logo from '../../duff-beer.svg'
import '../../styles/1-settings/settings.css';
import {motion} from 'framer-motion'


//import BoutonNav from '../BoutonNav/BoutonNav';
export default class Header extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            titre: this.props.titre || 'Biero',
            test: this.props.test,
            courriel: ''
        }
    }
        changerCourriel = (e) =>{
                this.setState({courriel : e.target.value});
        }
    
    login = (e) => {
        e.preventDefault();
        if (this.state.courriel !==""){;
        this.props.handleLogin(this.state.courriel)}
    }

    render(){
        return (
            <header>
                <nav>
                <NavLink to ="/"><img  className ="duff" src={logo } alt="duff biere"></img></NavLink>
                    <NavLink to ="/">A propos</NavLink>
                    <NavLink to ="/liste">Liste des bieres</NavLink>
                    <motion.a className="login" whileHover={{scale:1.1}}href="#">S'inscrire</motion.a>   
                    <form>
                <input onBlur = {this.changerCourriel} type="text" placeholder="usager"></input>
                <button  className="connect" onClick={this.login}>login</button>
                </form>
               
                </nav>
             
            </header>
        )
    }


}