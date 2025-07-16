import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaTimes, FaBars } from "react-icons/fa";
import './Header.scss';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "../../Helpers/formatNumber";
import { useDispatch } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../../actions/cart.action";
import { MdClose } from "react-icons/md";

function Header() {
    const [cartCount, setCartCount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerHeight <= 1199.98);
    const [isBars, setIsBars] = useState(false);
    const barRef = useRef(null);
    const productsCart = useSelector(state => state.cartReducer || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (barRef.current && !barRef.current.contains(e.target)) {
                setIsBars(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1199.98);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (productsCart && Array.isArray(productsCart.items)) {
            const totalPrice = productsCart.items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            const totalProduct = productsCart.items.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0)
            setTotalPrice(totalPrice);
            setCartCount(totalProduct);
        }
    }, [productsCart]);

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity(item.id));
        }
    };

    const handleDeletProduct = (id) => {
        dispatch(deleteProduct(id));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed) {
            navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
        }
    };

    console.log(productsCart)

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrap">
                        <div className="header__bars" onClick={() => setIsBars(true)}>
                            <FaBars />
                        </div>
                        <div className={`header__list ${isBars ? 'active' : ""}`} ref={barRef}>
                            <div className="header__container">
                                <div className="header__close" onClick={() => setIsBars(false)}>
                                    <MdClose />
                                </div>
                                <ul>
                                    <li onClick={() => setIsBars(false)}>
                                        <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
                                            Sản phẩm
                                        </NavLink>
                                    </li>
                                    <li onClick={() => setIsBars(false)}>
                                        <NavLink to="/favorite-products" className={({ isActive }) => isActive ? "active" : ""}>
                                            Sản phẩm yêu thích
                                        </NavLink>
                                    </li>
                                </ul>

                                <div className="header__search">
                                    <form onSubmit={handleSearch}>
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <button type="submit"><FaSearch /></button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='information__cart'>
                            <div className="dropdown-cart">
                                <div className="btn-shop dropdown-cart__btn">
                                    <p><FaShoppingBag /></p> <p>Giỏ hàng</p> <p>{isMobile ? cartCount : `(${cartCount})`}</p>
                                </div>
                                <div className="cart-shop">
                                    <div className="cart-shop__wrap">
                                        {productsCart.items.length === 0 ? (
                                            <div className="cart-shop__empty">Chưa có sản phẩm nào trong giỏ hàng.</div>
                                        ) : (
                                            productsCart.items.map(item => (
                                                <div className="cart-shop__item" key={item.id}>
                                                    <div className="cart-shop__img">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="cart-shop__content">
                                                        <div className="cart-shop__name">{item.name}</div>
                                                        <div className="cart-shop__price">
                                                            {formatNumber(item.price * item.quantity)}<span>đ</span>
                                                        </div>
                                                        <div className="cart-shop__quantity">
                                                            <button onClick={() => handleDecrease(item)}>-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => handleIncrease(item.id)}>+</button>
                                                        </div>
                                                        <div className="cart-shop__close" onClick={() => handleDeletProduct(item.id)}>
                                                            <FaTimes />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="cart-shop__total">
                                        <span>Tổng cộng:</span>
                                        <span className="total-price">{formatNumber(totalPrice)}<span>đ</span></span>
                                    </div>

                                    <div className="cart-shop__actions">
                                        <button className="btn btn-cart">Giỏ hàng</button>
                                        <button className="btn btn-checkout">Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;