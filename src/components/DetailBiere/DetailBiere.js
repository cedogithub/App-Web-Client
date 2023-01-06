import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DetailBiere.css";
import svg from "../../duff-beer.svg";
import { motion } from "framer-motion";


export default function DetailBiere(props) {
  const params = useParams();

  const urlBiere = `http://127.0.0.1:8000/webservice/php/biere/${params.id}`,
    urlBiereCommentaire = `${urlBiere}/commentaire`,
    urlBiereNote = `${urlBiere}/note`;

  const [biere, setBiere] = useState({}),
    [commentaires, setCommentaires] = useState([]),
    [notes, setNotes] = useState({}),
    [nouveauCommentaire, setNouveauCommentaire] = useState(""),
    [nouvelleNote, setNouvelleNote] = useState("");

  useEffect(() => {
    fetch(urlBiere)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBiere(data.data);
      });

    fetch(urlBiereCommentaire)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCommentaires(data.data);
      });

    fetch(urlBiereNote)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNotes(data.data);
      });
  }, []);
  

  let commentairesDom = commentaires.map((commentaire, index) => {
    return (
      <div className="comment-card" key={index}>
        <p>
          <strong>Autheur:</strong> {commentaire.courriel}
        </p>
        <br></br>
        <p>
          <strong>Commentaire:</strong> "{commentaire.commentaire}"{" "}
        </p>
      </div>
    );
  });

  //Gestion de si il y n'y a pas de note
  let note = Number(notes.note);
  let notesDom = note.toFixed(2);

  if (notes.nombre === 0) {
    notesDom = "Aucune note";
  }
  //Gestion de si il y n'y a pas de commentaire

  if (commentaires.length == 0) {
    commentairesDom = "Aucun Commentaire";
  }

  //lorsque lusager est connecter
  let blockAjoutCommentaire, blockAjoutNote;

  //connection de lusager verification
  if (props.courriel) {
    let form = document.querySelector("form");
    let div = document.createElement("div");
    form.textContent = "";
    form.appendChild(div);
    div.textContent = `Bonjour ${props.courriel} !`;

    blockAjoutCommentaire = (
      <div className="card-ajout">
        <h3>Autheur: {props.courriel}</h3>
        <br></br>
        <h3>Ajouter un nouveau commentaire:</h3>
        <textarea rows="3" cols="50" onBlur={setCommentaire}></textarea>
        <button onClick={soumettreCommentaire}>
          Ajouter votre commentaire
        </button>
      </div>
    );
    blockAjoutNote = (
      <div className="card-ajout">
        <h3>Ajouter une note:</h3>
        <input onBlur={setNote} type="number" required></input>
        <br></br>
        <button onClick={soumettreNote}>Ajouter votre note</button>
      </div>
    );
  }
  function setNote(e) {
    setNouvelleNote(e.target.value);
  }

  async function soumettreNote() {
    let oNotes = {
      note: nouvelleNote,
      courriel: props.courriel,
    };

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("biero:biero"),
      },
      body: JSON.stringify(oNotes),
    };

    let putNote = await fetch(urlBiereNote, options),
      getNotes = await fetch(urlBiereNote);

    Promise.all([putNote, getNotes])
      .then((response) => {
        return response[1].json();
      })
      .then((data) => {
        setNotes(data.data);
      });
  }

  //On prend la valeur entrer dans le bloc commentaire et l'insere dans la bd grace a la fonction setNouveauCommentaire
  function setCommentaire(e) {
    console.log(e.target.value);
    setNouveauCommentaire(e.target.value);
  }

  //creation de la fonction qui va ajouter dans la BD
  async function soumettreCommentaire() {
    //1.creer lobjet commentaire, la variable nouveauCommentaire est la valeur entrer dans le bloc commentaire

    let oCommentaire = {
      commentaire: nouveauCommentaire,
      courriel: props.courriel,
    };

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("biero:biero"),
      },
      body: JSON.stringify(oCommentaire),
    };

    let putCommentaire = await fetch(urlBiereCommentaire, options),
      getCommentaires = await fetch(urlBiereCommentaire);

    Promise.all([putCommentaire, getCommentaires])
      .then((response) => {
        return response[1].json();
      })
      .then((data) => {
        setCommentaires(data.data);
      });
  }
  return (
    <article className="fiche-container">
      <div className="biere-card fiche">
        <img src={svg}></img>
      </div>
      <div className="fiche-texte">
        <h1>{biere?.nom}</h1>

        <h2>{biere?.brasserie}</h2>
        <br></br>
        <h2>Note moyenne: {notesDom} ⭐</h2>
        <hr></hr>

        <p>{biere?.note_moyenne}</p>

        <div className="desc"><strong>Description:</strong><br></br> {biere?.description}</div>
        <hr></hr>
      </div>

      <div className="comment-container">
        <div className="card-comment">{commentairesDom}</div>
        <div className="ajout">
          {" "}
          {blockAjoutCommentaire}
          {blockAjoutNote}
        </div>
      </div>
    </article>
  );
}
