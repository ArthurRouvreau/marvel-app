import { formatModifiedDate } from './date'; // Assurez-vous que le chemin est correct

function CharacterDetail({ character = {} }) {
    // Si aucun personnage n'est fourni, afficher "No character"
    if (!character || Object.keys(character).length === 0) {
        return <div>No character</div>;
    } else {
        // Si un personnage est fourni, afficher ses détails
        return (
            <div>
                <h2>{character.name}</h2>
                {
                    // Si character.thumbnail n'est pas nul, afficher l'image
                    character.thumbnail && (
                        <img 
                            src={`${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`} 
                            alt={character.name} 
                        />
                    )
                }
                <p>{character.description}</p>
                
                {/* Afficher la date formatée */}
                <p> {formatModifiedDate(character.modified)}</p>
            </div>
        );
    }
}

export default CharacterDetail;