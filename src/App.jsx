import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';  // Assurez-vous que ce fichier est bien importé

// Créer un routeur qui utilise la stratégie de l'historique côté client
const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;