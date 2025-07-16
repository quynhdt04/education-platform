import { FaHeart } from "react-icons/fa";
import { formatNumber } from "../../Helpers/formatNumber";
import { getFavoriteProductsByUser, updateFavoriteProducts } from "../../services/favoriteProducts.service";
import { toast } from 'sonner';

function ProductItem(props) {
    const { onClickDetail, item, reload, setReload, isFavorite } = props;

    const handleToggleFavorite = async (productId) => {
        const userId = localStorage.getItem('userId');

        const favoriteData = await getFavoriteProductsByUser(userId);
        const favoriteId = favoriteData.id;
        const oldFavorites = favoriteData.productIds;

        let isFavorite;
        let updatedFavorites;

        if (oldFavorites.includes(productId)) {
            updatedFavorites = oldFavorites.filter(id => id !== productId);
            isFavorite = false;
        } else {
            updatedFavorites = [...oldFavorites, productId];
            isFavorite = true;
        }

        if (isFavorite) {
            toast.success('Đã thêm vào sản phẩm yêu thích');
        } else {
            toast.info('Đã xóa khỏi sản phẩm yêu thích');
        }
        
        setReload(!reload);
        await updateFavoriteProducts(favoriteId, { productIds: updatedFavorites });
    };

    return (
        <>
            <div className="search__item">
                <div className="search__img">
                    <img src={item.image} alt="" />
                </div>
                <div className="search__content">
                    <div className="search__name">
                        {item.name}
                    </div>
                    <div className="search__description">
                        {item.shortDescription}
                    </div>
                    <div className="search__price-favourite">
                        <div className="search__price">
                            <span className="current-price">{formatNumber(item.price)}</span>
                            <span className="current-symbol">đ</span>
                        </div>
                        <div className={`search__favourite ${isFavorite ? 'like' : ''}`}
                            onClick={() => handleToggleFavorite(item.id)}>
                            <FaHeart />
                        </div>
                    </div>
                    <div className="search__btn-detail">
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