import React from "react";
import Biere from "../Biere/Biere";
import { Link } from "react-router-dom";
import "../../styles/5-grid/grid.css";
import coeurblanc from "../../heart-svgrepo-com.svg";
import { motion } from "framer-motion";

export default class ListeBiere extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bieres: [],
      img: coeurblanc,
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/webservice/php/biere/")
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error();
      })
      .then((data) => {
        this.setState({ bieres: data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    const bieres = this.state.bieres.map((biere, index) => {
      return (
        <Link
          className="article_link"
          to={`/biere/${biere.id_biere}`}
          key={index}
        >
          <Biere data={biere} />
        </Link>
      );
    });

    return (
      <div className="liste-container">
        <h2 className="liste">Liste des bieres</h2>
        <hr></hr>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="bieres-container"
        >
          {bieres}
        </motion.div>
        <hr></hr>
      </div>
    );
  }
}
