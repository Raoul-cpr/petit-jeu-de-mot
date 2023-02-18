import Card from '../card/card'
import './list_card.css';
import CheckCard from '../check_card/check_card';
import Formulaire from '../formulaire/formulaire';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListCard() {
    //listes des mots en francais
    const listMots = [
        "abaisser",
        "abandonner",
        "abasourdir",
        "abattre",
        "abdiquer",
        "abeille",
        "aberration",
        "abjurer",
        "abolir",
        "abominable",
        "aborder",
        "aboyer",
        "abrasif",
        "abreuver",
        "abriter",
        "abroger",
        "absence",
        "absolu",
        "absurde",
        "abusif",
        "abyssal",
        "académie",
        "acariâtre",
        "accabler",
        "accepter",
        "acclamer",
        "accolade",
        "accroche",
        "accuser",
        "acerbe",
        "achat",
        "chronique",
        "chronomètre",
        "chute",
        "chypre",
        "ciboulette",
        "cicatrice",
        "cigogne",
        "cigare",
        "cigarette",
        "cigogne",
        "défaut",
        "défense",
        "défenseur",
        "définitif",
        "définitivement",
        "défiscalisation",
        "défiscaliser",
        "défis",
        "effet",
        "efficace",
        "efficacité",
        "effigie",
        "effilocher",
        "effilocheur",
        "effleurer",
        "effondrement",
        "effondrer",
        "effrayant",
        "fou",
        "fouet",
        "fouetter",
        "fougue",
        "fougueux",
        "fouiller",
        "fouineur",
        "fouineuse",
        "fouir",
        "foule",
        "fouler",
        "foultitude",
        "foulure",
        "four",
        "fourbe",
        "fourberie",
        "fourbi",
        "fourche",
        "fourchette",
        "fourgon",
        "fourgonnette",
        "fourmi",
        "fourmiller",
        "fourneau",
        "fourrager",
        "fourrage",
        "fourrer",
        "fourrure",
        "fourvoyant",
        "fourvoyeuse",
        "génie",
        "génital",
        "géniteur",
        "génitrice",
        "génocide",
        "génome",
        "génotype",
        "géographie",
        "géométrie",
        "géopolitique",
        "géorgie",
        "géothermie",
        "géranium",
        "gérontologie",
        "gérontophile",
        "gérontophilie",
        "gérontophobe",
        "gérontophobie",
        "gérontopole",
        "gérontophile",
        "gérontophilie",
        "gérontophobe",
        "gérontophobie",
        "gérontopole",
        "hélice",
        "hélicoptère",
        "hématome",
        "hématopoïèse",
        "hématose",
        "hémiplégie",
        "hémiplégique",
        "hémiplégique",
        "hémiplégie",
        "hémiplégique",
        "hémiplégique",
        "acheter",
        "chat",
        "chien",
        "pomme",
        "poire",
        "table",
        "chaise",
        "ordinateur",
        "voiture",
        "velo",
        "voiture",
        "maison",
        "animal",
        "robot",
        "bateau",
        "avion",
        "train",
        "immeuble",
        "pont",
        "pizza",
        "pirogue",
        "élite",
        "moto",
        "terre",
        "lune",
        "soleil",
        "mer",
        "montagne",
        "plage",
        "sable",
        "eau",
        "feu",
        "air",
        "papier",
        "pierre",
        "ciseaux",
        "sociale",
        "economie",
        "politique",
        "culture",
        "religion",
        "technologie",
        "sport",
        "economique",

    ];



    const [conState, setConState] = useState(false);

    //mot initial
    const [listMotCourant] = useState(listMots[Math.floor(Math.random() * listMots.length)]);

    //liste des lettres du mot initial mélangés
    const [listDesordreLettre, setDesordreLettre] = useState(listMotCourant.split("").slice().sort(() => Math.random() - 0.7));

    //lettres classées par le joueur
    const [listCardDelete, setListCardDelete] = useState([]);

    //liste de lettre gardé au cas ou le jpueur ne reussit pas
    const [listDesordreLettreSave] = useState(listDesordreLettre);

    //le score du joueur
    const [score, setScore] = useState(10);

    //username
    const [username, setUsername] = useState("");

    //l'etat de l'interface
    const [voirScore, setVoirScore] = useState(false);

    //liste des meilleurs joueurs
    const [listBestPlayers, setListBestPlayers] = useState([]);

    //pour suivre les changement du score et l'actualiser
    useEffect((event) => {
        console.log(username, score, listCardDelete.join(""), listMotCourant);
        if (listCardDelete.join("") === listMotCourant) {
            console.log("score : " + score);
            console.log(username)
            axios.post("http://localhost:3000/api/update_score", { "score": score, "username": username }).then((response) => {
                console.log(response);
                event.preventDefault();
            }).catch((err) => {
                console.log(err);
            })
        }

    }, [score, username, listCardDelete, listMotCourant]);


    let newList = [];

    return (
        voirScore ?
            <div>
                <div className='titre'>Le top 10 des meilleurs joueurs</div>
                <table className='liste'>{<tr className='titre_tab'><td className='col1'>Joueurs</td><td  className='col2'>Scores</td></tr>}{listBestPlayers.map((e) => { return <tr> <td className='col1'>{e.username} </td>  <td  className='col2'>{e.score}</td>  </tr> })}</table>
                <br />
                <button onClick={() => { setVoirScore(false) }} className='return_button'>Quitter</button>
            </div>
            : conState ? <div>
                <button onClick={(event) => {
                    axios.get('http://localhost:3000/api/get_score').then((response) => {
                        console.log(response);
                        setListBestPlayers(response.data);
                        setVoirScore(true);
                        event.preventDefault();

                    })
                }} className='button_players'>Liste des meillleurs joueurs</button>
                <div className='list_card_delete'>
                    {listCardDelete.map((card) => { return <div>{<Card letter={card} />}</div> })}{listDesordreLettre.map((card) => { return <div>{<CheckCard />}</div> })}
                </div>
                <div>{listCardDelete.join("") === listMotCourant ? <div className='succes'>Bravo {username} !</div> : null}</div>
                <div>{listCardDelete.join("") === listMotCourant ? <div className='score'>Score : {score}</div> : null}</div>
                <div>{listCardDelete.join("") === listMotCourant ? <button className='button' onClick={() => { window.location.reload() }}>Rééssayer</button> : null}</div>
                <br />
                <div>{listCardDelete.length === listMotCourant.split("").length && listCardDelete.join("") !== listMotCourant ? <div className='echecContainer'>Oops! le mot n'est pas correct </div> : null}</div>
                <br />
                <div>{listCardDelete.length === listMotCourant.split("").length && listCardDelete.join("") !== listMotCourant ? <button className='echecButton' onClick={() => { setDesordreLettre(listDesordreLettreSave); setListCardDelete([]); setScore(score - 1) }}>Reprendre</button> : null}</div>
                <div className='list_card'>
                    {listDesordreLettre.map((card, index) => {
                        return <div onClick={async () => {
                            newList = [...listDesordreLettre];
                            newList.splice(index, 1);
                            setDesordreLettre(newList);
                            setListCardDelete([...listCardDelete, card]);
                            console.log(listMotCourant);
                            console.log(listCardDelete.join(""));


                        }}>{<Card letter={card} />}</div>
                    })}

                </div>
            </div> : <div>{<Formulaire onSubmit={()=>{}} onChange={e => setUsername(e.target.value)} onClick={async () => {

                await axios.post('http://localhost:3000/api/connexion', { "username": username }).then((response) => {
                    console.log(response);
                    setConState(true);
                 //   event.preventDefault();
                });

            }} />}
            </div>
    );
}

export default ListCard