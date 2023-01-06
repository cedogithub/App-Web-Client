// import logo from '../../logo.svg';
import React from "react";
import "../../styles/5-grid/grid.css";
import "./Biere.css";
import img from "../../img/biere.png";
import svg from "../../duff-beer.svg";
import heart from "../../coeur.svg";
import coeurblanc from "../../heart-svgrepo-com.svg";

export default class Biere extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      img: coeurblanc,
    };
  }
  render() {
    let note = Number(this.props.data.note_moyenne);
    let noteArrondi = note.toFixed(2);
    
    return (<>
      <div className="biere-card">
        <img
          Name="heart"
          src={this.state.img}
          onMouseOver={() => {
            this.setState({
              img: heart,
            });
          }}
              />
        <h4> {this.props.data.nom}</h4>
        <img className="biereimg" src={svg} alt="biere"></img>
        <div className="biere-info">
          <p> {this.props.data.brasserie}</p>

          <p className="note">Note: <span>{noteArrondi}</span>⭐</p>
        </div>
      </div></>
    );
  }
}
