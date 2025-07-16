import { useEffect } from "react";
import { allRoutes } from "../../routes";
import { useRoutes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { postFavoriteProduct } from "../../services/favoriteProducts.service";
import ChatBot from "../ChatBox";

function RoutesAll() {

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            const newUserId = uuidv4();
            localStorage.setItem('userId', newUserId);
            console.log("Tạo userId mới:", newUserId);

            postFavoriteProduct({
                userId: newUserId,
                productIds: [],
            })
                .then(() => {
                    console.log("Đã khởi tạo favoriteProducts cho user mới.");
                })
                .catch((err) => {
                    console.error("Lỗi khi khởi tạo favoriteProducts:", err);
                });

        } else {
            console.log("Đã có userId:", userId);
        }
    }, []);

    const elements = useRoutes(allRoutes);

    return (
        <>
            <ChatBot/>
            {elements}
        </>
    )
}

export default RoutesAll;