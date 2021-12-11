import { ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { humanziePrice } from '../common/ultis';
import EmptyList from '../components/EmptyList';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { getOrders } from '../store/order.store';

const OrderItem = ({ order }) => {
    let timeStamp = '';
    const dateString = new Date(order.timestamp).toLocaleDateString();
    const timeString = new Date(order.timestamp).toLocaleTimeString();

    timeStamp = `${dateString} - ${timeString}`;

    return <li
        key={order.id}
        className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
        <div className="flex items-center justify-between space-x-4">
            <div className="min-w-0 space-y-3">
                <div className="flex items-center space-x-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="block">
                        <h2 className="text-sm font-medium">
                            <Link to={`orders/${order.id}`}>
                                <span className="absolute inset-0" aria-hidden="true" />
                                {order.id}{' '}
                            </Link>
                        </h2>
                    </span>
                </div>
                <span className="relative group flex items-center space-x-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                        {humanziePrice(order.payment_details.total)}
                    </span>
                </span>
            </div>
            <div className="sm:hidden">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                <p className="flex items-center space-x-4">
                    <span
                        className="relative text-sm text-gray-500 hover:text-gray-900 font-medium"
                    >
                        {timeStamp}
                    </span>
                </p>
                <p className="flex text-gray-500 text-sm space-x-2 items-center">
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{order.delivery_info.address}</span>
                    </span>

                    <span aria-hidden="true">&middot;</span>
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{order.delivery_info.name}</span>
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{order.delivery_info.phone_number}</span>
                    </span>
                </p>
            </div>
        </div>
    </li>;

}

export default function Orders() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders()).unwrap();
    }, []);

    const { orders } = useSelector(state => state.orders);

    return (
        <div className="w-full flex flex-col justify-between mb-6 gap-8 max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 shadow-lg my-12">
            <div className="pl-4 pr-6 pt-4 pb-4 border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg font-medium">Đơn hàng của bạn</h1>
                </div>
            </div>
            {
                orders ?
                    (orders.length > 0
                        ? <ul className="relative z-0 divide-y divide-gray-200 border-t border-gray-200">
                            {orders.map((order) => <OrderItem key={order.id} order={order} />)}
                        </ul>
                        : <EmptyList title="Danh sách rỗng" subTilte="Bạn chưa có đơn hàng nào." />)
                    : <>
                        <div className="relative z-0 divide-y divide-gray-200 border-t border-gray-200 h-16 bg-gray-200 animate-pulse"></div>
                        <div className="relative z-0 divide-y divide-gray-200 border-t border-gray-200 h-16 bg-gray-200 animate-pulse"></div>
                        <div className="relative z-0 divide-y divide-gray-200 border-t border-gray-200 h-16 bg-gray-200 animate-pulse"></div>
                        <div className="relative z-0 divide-y divide-gray-200 border-t border-gray-200 h-16 bg-gray-200 animate-pulse"></div>
                    </>
            }

        </div >
    )
}
