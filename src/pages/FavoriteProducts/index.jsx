import './FavoriteProduct.scss';
import ProductItem from "./ProductItem";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { getProducts } from '../../services/product.service';
import SkeletonProductItem from './SkeletonProductItem';
import { getFavoriteProductsByUser } from '../../services/favoriteProducts.service';

function FavoriteProducts() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchApi = async () => {
            const favoriteProductList = await getFavoriteProductsByUser(userId);
            const productList = await getProducts();

            const favoriteProducts = productList.filter(item =>
                favoriteProductList.productIds.includes(item.id)
            );

            setTimeout(() => {
                setProducts(favoriteProducts);
                setLoading(false);
            }, 3000)
        }
        fetchApi();
    }, [reload]);

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
                        <div className="product__list">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <SkeletonProductItem key={index} />
                                ))
                            ) : products.length === 0 ? (
                                <div className="product__empty">
                                    Chưa có sản phẩm yêu thích nào.
                                </div>
                            ) :
                                products.map(item => (
                                    <ProductItem
                                        key={item.id}
                                        item={item}
                                        reload={reload}
                                        setReload={setReload}
                                        isFavorite={true}
                                        onClickDetail={() => handleOpenModal(item)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FavoriteProducts;