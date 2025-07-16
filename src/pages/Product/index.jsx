import './Product.scss';
import ProductItem from "./ProductItem";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import PriceFilter from "../../components/PriceFilter";
import { getProducts } from '../../services/product.service';
import { useSelector } from 'react-redux';
import SkeletonProductItem from './SkeletonProductItem';
import { getFavoriteProductsByUser } from "../../services/favoriteProducts.service";
import { FaRegLightbulb } from "react-icons/fa";
import { getProducListSuggest } from '../../services/suggest.service';

function Product() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const selectedPrices = useSelector(state => state.priceFilterReducer);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [reload, setReload] = useState(false);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getProducts();
            setTimeout(() => {
                setProducts(data);
                setOriginalProducts(data);
                setLoading(false);
            }, 3000);
        }
        fetchApi();
    }, []);


    const getFilteredProducts = () => {
        if (selectedPrices.length === 0) {
            setProducts(originalProducts);
            return;
        }

        const filtered = originalProducts.filter(product => {
            const price = product.price;
            return selectedPrices.some(range => {
                if (range === "<500000") return price < 500000;
                if (range === "500000-1000000") return price >= 500000 && price <= 1000000;
                if (range === ">1000000") return price > 1000000;
                return false;
            });
        });

        setProducts(filtered);
    };

    useEffect(() => {
        getFilteredProducts();
    }, [selectedPrices]);


    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchApi = async () => {
            const data = await getFavoriteProductsByUser(userId);
            setFavoriteProducts(data?.productIds || []);
        };

        if (userId) fetchApi();
    }, [reload]);

    const handleSuggest = async () => {
        const userId = localStorage.getItem('userId');
        const res = await getProducListSuggest(userId);
        console.log(res.productIds)
        console.log(originalProducts);

        const productsFinal = originalProducts.filter(item =>
            res.productIds.includes(item.id)
        );
        setProducts(productsFinal);
    }

    return (
        <>
            {isModalOpen && (
                <>
                    <div className="modal__overlay"></div>
                    <Modal onClose={handleCloseModal} isModalOpen={isModalOpen} product={selectedProduct} />
                </>
            )}

            <div className="product">
                <div className="container">
                    <div className="product__wrap">
                        <PriceFilter />
                        <div className="product__content">
                            <div className="product__suggeset">
                                <button onClick={handleSuggest}>Gợi ý <FaRegLightbulb /> </button>
                            </div>
                            <div className="product__list">
                                {loading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonProductItem key={index} />
                                    ))
                                    : products.map(item => (
                                        <ProductItem
                                            key={item.id}
                                            item={item}
                                            reload={reload}
                                            setReload={setReload}
                                            isFavorite={favoriteProducts.includes(item.id)}
                                            onClickDetail={() => handleOpenModal(item)}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;