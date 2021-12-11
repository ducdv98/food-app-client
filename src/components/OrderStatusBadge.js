import { OrderStatus } from "../common/order-status"

export const OrderStatusBadge = ({ status }) => {

    const getBadge = () => {
        switch (status) {
            case OrderStatus.SUBMITTED:
                return <button
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                    Đã tiếp nhận
                </button>;

            case OrderStatus.ONGOING:
                return <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                    Đang giao
                </span>;

            case OrderStatus.DELIVERED:
                return <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                    Đã giao
                </span>;

            case OrderStatus.CANCELLED:
                return <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                    Đã hủy
                </span>;
                default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Không xác định</span>
        }
    }

    return getBadge();
}