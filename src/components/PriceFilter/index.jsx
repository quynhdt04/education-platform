import { useEffect, useRef, useState } from 'react';
import './PriceFilter.scss';
import { FaSearch } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { priceFilter } from '../../actions/priceFilter';


function PriceFilter() {

    const priceOptions = [
        { id: "priceUnder500k", value: "<500000", label: "Giá dưới 500.000đ" },
        { id: "price500kTo1mil", value: "500000-1000000", label: "500.000đ - 1.000.000đ" },
        { id: "priceAbove1mil", value: ">1000000", label: "Trên 1.000.000đ" }
    ];

    const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(false);
    const priceFilterRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPrices, setSelectedPrices] = useState([]);
    const dispatch = useDispatch();


    const hanldeOpenPriceFilter = () => {
        setIsOpenPriceFilter(!isOpenPriceFilter);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (priceFilterRef.current && !priceFilterRef.current.contains(e.target)) {
                setIsOpenPriceFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const filteredOptions = priceOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        let updatePrices = checked
            ? [...selectedPrices, value]
            : selectedPrices.filter(v => v !== value);
        setSelectedPrices(updatePrices);
        dispatch(priceFilter(updatePrices));
    }

    return (
        <>
            <div className={`price-filter ${isOpenPriceFilter ? 'active' : ''}`} ref={priceFilterRef}>
                <div className="price-filter__icon" onClick={hanldeOpenPriceFilter}>
                    {isOpenPriceFilter ? <IoCloseSharp /> : <HiMiniBars3BottomRight />}
                </div>
                <div className={`price-filter__wrap`}>
                    <div className="price-filter__item">
                        <div className="price-filter__header">
                            <span>Giá sản phẩm</span>
                        </div>
                        <div className="price-filter__body">
                            <div className="price-filter__search">
                                <input
                                    type="text"
                                    placeholder="Tìm sản phẩm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} />
                                <button><FaSearch /></button>
                            </div>
                            <ul className="price-filter__choices">
                                {filteredOptions.map(option => (
                                    <li key={option.id}>
                                        <input
                                            type="checkbox"
                                            name="price"
                                            id={option.id}
                                            value={option.value}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={option.id}>{option.label}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriceFilter;