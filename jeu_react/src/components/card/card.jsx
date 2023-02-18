import './card.css'
// import {useState} from 'react';
let listLetter =[];
function Card(props){
   // const [letter, setLetter] = useState(props.letter);
    return (
    <div className="card">
       <div className="letter">
        {props.letter}
       </div>
    </div>
    );
}

export {listLetter};
export default Card