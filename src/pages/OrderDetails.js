import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { getDishes } from '../store/dish.store';
import { getOrderById, reorder } from '../store/order.store';
import { humanziePrice } from '../common/ultis';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { OrderStatus } from '../common/order-status';

const OrderItem = ({ item }) => {

    return item ? <li key={item.id} className="py-6 flex flex-col">
        <div className="flex items-center">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                    src={item.images && item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`../dishes/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">{humanziePrice(item.price)}</p>
                    </div>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex flex-col gap-4 pt-4">
                        Số lượng: {item.amount}
                    </div>

                </div>
            </div>
        </div>

        <div className="ml-28 w-full mt-3 flex items-center">
            <div className="w-16 text-sm text-gray-500">Ghi chú:</div>
            <div
                className="block sm:text-sm border-gray-300 border-b text-gray-500"
            >{item.note || '<Không có ghi chú đặc biệt>'}</div>
        </div>

    </li>
        : <div>
            <div className="animate-pulse h-16 w-full bg-gray-200 rounded my-4"></div>
            <div className="animate-pulse h-16 w-full bg-gray-200 rounded my-4"></div>
        </div>;

}

export default function OrderDetails() {

    const { id } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderById(id));
        dispatch(getDishes());
    }, []);

    const items = useSelector(state => {
        const { orders } = state.orders;
        const { dishes } = state.dishes;

        const items = orders.find(o => o.id === id)?.items;

        if (items) {
            const mappedData = items.map(i => {
                const dish = dishes.find(d => d.id.localeCompare(i.id) === 0);
                return {
                    ...i,
                    ...dish
                };
            });

            if (mappedData.length > 0) {
                return mappedData.sort((a, b) => a.name?.toLowerCase().localeCompare(b?.name?.toLowerCase()));
            } else {
                return [];
            }
        } else {
            return [];
        }
    });

    const onReorder = async () => {
        await dispatch(reorder(id)).unwrap();

        history.push('../cart');
    }

    const order = useSelector(state => {
        const orders = state.orders.orders;
        return orders.find(o => o.id === id);
    });

    const getTimeStamp = () => {
        const dateString = new Date(order?.timestamp).toLocaleDateString();
        const timeString = new Date(order?.timestamp).toLocaleTimeString();

        return `${dateString} - ${timeString}`;
    }

    return (
        <>
            <div className="min-h-full">
                <main className="py-10">
                    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6 flex flex-row justify-between w-full">
                                        <div>
                                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                Chi tiết đơn hàng: #{id}
                                            </h2>
                                            <OrderStatusBadge status={order?.status} />
                                        </div>
                                        <div className='flex flex-col items-end justify-between'>
                                            <p className="max-w-2xl text-sm text-gray-500">{getTimeStamp()}</p>
                                            {order && (order.status === OrderStatus.CANCELLED || order.status === OrderStatus.DELIVERED)
                                                ? <button
                                                    onClick={() => onReorder()}
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                                >
                                                    Đặt lại
                                                </button>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <div className="flow-root">
                                            <ul className="divide-y divide-gray-200">
                                                {items.map((item) => <OrderItem key={item.id} item={item} />)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                    Thông tin hóa đơn
                                </h2>

                                <div className="mt-6 flow-root">
                                    <div className="w-full  rounded px-4">
                                        <div className="flex flex-row py-4 items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <div className="text-base font-medium text-gray-900">{order?.delivery_info?.name}</div>
                                        </div>
                                        <div className="flex flex-row py-4 items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <div className="text-base font-medium text-gray-900">{order?.delivery_info?.phone_number}</div>
                                        </div>
                                        <div className="flex flex-row py-4 items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div className="text-base font-medium text-gray-900">{order?.delivery_info?.address}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flow-root">
                                    <div className="w-full bg-gray-100 rounded px-4 divide-y divide-gray-300">
                                        <div className="flex flex-row justify-between py-4">
                                            <div className="text-base font-medium text-gray-900">Tổng tiền sản phẩm</div>
                                            <div className="text-base font-medium text-gray-900">{humanziePrice(order?.payment_details?.sub_total)}</div>
                                        </div>
                                        <div className="flex flex-row justify-between py-4">
                                            <div className="text-base font-medium text-gray-900">Phí ship</div>
                                            <div className="text-base font-medium text-gray-900">{humanziePrice(order?.payment_details?.shipping_fee)}</div>
                                        </div>
                                        <div className="pb-4">
                                            <div className="flex flex-row justify-between py-4">
                                                <div className="text-base font-medium text-gray-900">Thành tiền</div>
                                                <div className="text-base font-medium text-gray-900">{humanziePrice(order?.payment_details?.total)}</div>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500 flex flex-row gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Đã bao gồm phí ship</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}
