import "./Modal.scss";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { formatNumber } from "../../Helpers/formatNumber";
import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../actions/cart.action";
import { toast } from 'sonner';

function Modal(props) {
    const { onClose, isModalOpen, product } = props;
    const modalRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast(`Đã thêm "${product.name}" vào giỏ hàng!`, {
            icon: <FaShoppingCart style={{ color: "#FF4C29", fontSize: "20px" }}/>,
            duration: 3000
        });
    }

    return (
        <>
            <div className={`modal ${isModalOpen ? 'active' : ''}`} ref={modalRef}>
                <div className="container">
                    <div className="modal__wrap">
                        <div className="modal__close" onClick={onClose}><IoClose /></div>
                        <div className="modal__img">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="modal__info">
                            <div className="modal__title">
                                {product.name}
                            </div>
                            <div className="modal__rating">
                                {(() => {
                                    const fullStars = Math.floor(product.rating);
                                    const hasHalfStar = product.rating % 1 >= 0.5;
                                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                                    const stars = [];

                                    for (let i = 0; i < emptyStars; i++) {
                                        stars.push(<FaRegStar key={`empty-${i}`} color="#e4e5e9" size={24} />);
                                    }

                                    if (hasHalfStar) {
                                        stars.push(<FaStarHalfAlt key="half" color="#ffc107" size={24} />);
                                    }

                                    for (let i = 0; i < fullStars; i++) {
                                        stars.push(<FaStar key={`full-${i}`} color="#ffc107" size={24} />);
                                    }

                                    return stars;
                                })()}
                            </div>
                            <p className="modal__description">
                                {product.fullDescription}
                            </p>
                            <div className="modal__price">
                                Giá: <span>{formatNumber(product.price)}</span>
                                <span>đ</span>
                            </div>
                            <div className="modal__btn" onClick={handleAddToCart}>
                                <button><FaShoppingCart /> Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;