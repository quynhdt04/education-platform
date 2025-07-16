import "./SearchResult.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../services/product.service";
import { removeVietnameseTones } from "../../Helpers/removeVietnameseTones";
import Modal from "../../components/Modal/Modal";
import ProductItem from "./ProductItem";
import { getFavoriteProductsByUser } from "../../services/favoriteProducts.service";

function SearchResult() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reload, setReload] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getProducts();
            setProducts(result);
        }
        fetchApi();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchApi = async () => {
            const data = await getFavoriteProductsByUser(userId);
            setFavoriteProducts(data?.productIds || []);
        };

        if (userId) fetchApi();
    }, [reload]);

    const filteredProducts = products.filter(product =>
        removeVietnameseTones(product.name).includes(removeVietnameseTones(keyword))
    );

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    console.log(filteredProducts)

    return (
        <>
            {isModalOpen && (
                <>
                    <div className="modal__overlay"></div>
                    <Modal onClose={handleCloseModal} isModalOpen={isModalOpen} product={selectedProduct} />
                </>
            )}
            <div className="search">
                <div className="container">
                    {filteredProducts.length > 0 ? (
                        <div className="search__wrap">
                            <div className="search__result">
                                Có {filteredProducts.length} kết quả tìm kiếm phù hợp
                            </div>
                            <div className="search__list">
                                {filteredProducts.map(item => (
                                    <ProductItem
                                        key={item.id}
                                        item={item}
                                        reload={reload}
                                        setReload={setReload}
                                        isFavorite={favoriteProducts.includes(item.id)}
                                        onClickDetail={() => handleOpenModal(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchResult;