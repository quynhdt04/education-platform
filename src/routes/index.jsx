import LayoutDefault from "../layouts/LayoutDefault";
import  Product  from "../pages/Product";
import FavoriteProducts from "../pages/FavoriteProducts";
import SearchResult from "../pages/SearchResult";

export const allRoutes = [
    {
        path: "/",
        element: <LayoutDefault/>,
        children: [
            {
                index: true,
                element: <Product />
            },
            {
                path: "products",
                element: <Product />
            },
            {
                path: "search",
                element: <SearchResult />
            },
            {
                path: "favorite-products",
                element: < FavoriteProducts/>
            }
        ]
    }
]