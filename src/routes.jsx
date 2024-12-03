import { DEFAULT_ORDER, DEFAULT_ORDER_BY, getCharacterById, getCharacters } from "./api/characters-api";
import Layout from "./Layout";
import AboutPage from "./pages/AboutPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import CharactersPage from "./pages/CharactersPage";
import ContactPage from "./pages/ContactPage";
import CompareCharactersPage from "./pages/CompareCharactersPage";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <CharactersPage />,
                loader: ({ request }) => {

                    const url = new URL(request.url);
                    const searchParams = url.searchParams;

                    const orderBy = searchParams.get("orderBy") || DEFAULT_ORDER_BY;
                    const order = searchParams.get("order") || DEFAULT_ORDER;

                    console.log(`orderBy: ${orderBy}, order: ${order}`);

                    return getCharacters(orderBy, order);
                }
            },
            {
                path: "/characters/:id",
                element: <CharacterDetailPage />,
                loader: ({ params }) => getCharacterById(params.id),
            },
            {
                path: "/compare",
                element: <CompareCharactersPage />,
                loader: ({ request }) => {

                    return getCharacters();
                },
            },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
        ],
    },
];

export default routes;