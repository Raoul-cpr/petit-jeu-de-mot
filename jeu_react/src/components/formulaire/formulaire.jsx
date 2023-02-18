import './formulaire.css'



const Formulaire = (props) => {

    return (<div>
        <div className='container'>
            <form action="#">
                <div className="text">Entrez votre nom d'utilisateur ou pseudo</div>
                <input className='input' type="text" id="username" name="username" onChange={props.onChange} />
                <button onClick={(event) => {event.preventDefault(); props.onClick(); }} className='buttonSubmit' type="submit">Connexion</button>
            </form>
        </div>

    </div>);
}

export default Formulaire;