import { Link } from "react-router-dom";
import { formatModifiedDate } from './date'; // Assurez-vous que le chemin est correct

export function CharactersList({ characters = [] }) {
  return (
    <ul id="characters">
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <strong>{character.name}</strong>
          </Link>
          <small>{" - "}{formatModifiedDate(character.modified)}</small> {/* Affichage de la date formatée */}
        </li>
      ))}
    </ul>
  );
}
