import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonProductItem() {
    return (
        <div className="product__item">
            <div className="product__img">
                <Skeleton height={150} />
            </div>
            <div className="product__content">
                <div className="product__name">
                    <Skeleton width={`80%`} />
                </div>
                <div className="product__description">
                    <Skeleton count={2} />
                </div>
                <div className="product__price-favourite">
                    <Skeleton width={100} />
                    <Skeleton circle width={24} height={24} />
                </div>
                <div className="product__btn-detail">
                    <Skeleton height={20} width={120} />
                </div>
            </div>
        </div>
    );
}

export default SkeletonProductItem;
