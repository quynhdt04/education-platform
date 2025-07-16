import { FaHeart } from "react-icons/fa";
import { formatNumber } from "../../Helpers/formatNumber";
import { getFavoriteProductsByUser, updateFavoriteProducts } from "../../services/favoriteProducts.service";

function ProductItem(props) {
    const { onClickDetail, item, reload, setReload, isFavorite } = props;

    const handleToggleFavorite = async (productId) => {
        const userId = localStorage.getItem('userId');

        const favoriteData = await getFavoriteProductsByUser(userId);
        const favoriteId = favoriteData.id;
        const oldFavorites = favoriteData.productIds;

        let updatedFavorites;

        if (oldFavorites.includes(productId)) {
            updatedFavorites = oldFavorites.filter(id => id !== productId);
        } else {
            updatedFavorites = [...oldFavorites, productId];
        }

        setReload(!reload);
        await updateFavoriteProducts(favoriteId, { productIds: updatedFavorites });
    };

    return (
        <>
            <div className="product__item">
                <div className="product__img">
                    <img src={item.image} alt="" />
                </div>
                <div className="product__content">
                    <div className="product__name">
                        {item.name}
                    </div>
                    <div className="product__description">
                        {item.shortDescription}
                    </div>
                    <div className="product__price-favourite">
                        <div className="product__price">
                            <span className="current-price">{formatNumber(item.price)}</span>
                            <span className="current-symbol">đ</span>
                        </div>
                        <div className={`product__favourite ${isFavorite ? 'like' : ''}`}
                            onClick={() => handleToggleFavorite(item.id)}>
                            <FaHeart />
                        </div>
                    </div>
                    <div className="product__btn-detail">
                        <div className="btn" onClick={onClickDetail}>
                            Xem chi tiết
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem;