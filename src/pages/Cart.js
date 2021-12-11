import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as _ from 'lodash';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { getCart, getDeliveryInfo, updateCart } from "../store/cart.store";

import { getDishes } from "../store/dish.store";
import ChooseAmount from "../components/ChooseAmount";
import { humanziePrice } from "../common/ultis";
import { phoneRegExp } from "../common/regex-patterns";
import { createOrder } from "../store/order.store";
import EmptyList from "../components/EmptyList";
import { classNames } from "../common/class-names";

const CartItem = ({ item, onUpdateItem }) => {
    const onAmountChange = (amount) => {
        const update = {
            id: item.id,
            amount,
            note: item.note
        };

        onUpdateItem(update);
    }

    const onNoteChange = _.debounce((note) => {
        const update = {
            id: item.id,
            amount: item.amount,
            note
        };

        onUpdateItem(update);
    }, 500);

    const onRemoveItem = () => {
        const update = {
            id: item.id,
            amount: 0,
        };

        onUpdateItem(update);
    }

    return item ? <li key={item.id} className="py-6 flex flex-col">
        <div className="flex items-center">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`dishes/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">{humanziePrice(item.price)}</p>
                    </div>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex flex-col gap-4 pt-4">
                        <ChooseAmount type='small' initialValue={item.amount} onAmountChange={onAmountChange}></ChooseAmount>
                    </div>

                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => onRemoveItem()}>
                            Remove
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div className="w-full mt-3">
            <textarea
                rows={2}
                type="text"
                placeholder="ví dụ: Thêm tương ớt"
                defaultValue={item.note}
                onChange={(e) => onNoteChange(e.target.value)}
                className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            ></textarea>
        </div>

    </li>
        : <div>
            <div className="animate-pulse h-16 w-full bg-gray-200 rounded my-4"></div>
            <div className="animate-pulse h-16 w-full bg-gray-200 rounded my-4"></div>
        </div>;

}

export default function Cart() {

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getDishes()).unwrap();
        dispatch(getCart()).unwrap();
        dispatch(getDeliveryInfo()).unwrap();
    }, []);

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ.')
            .test(
                "len",
                "Số điện thoại không hợp lệ.",
                (val) =>
                    val &&
                    val.toString().length >= 9 &&
                    val.toString().length <= 11
            )
            .required("Số điện thoại không được để trống!"),
        name: Yup.string()
            .required("Tên không được để trống!"),
        address: Yup.string()
            .required("Địa chỉ không được để trống!"),
    });

    const { delivery_info } = useSelector(state => state.cart);

    const items = useSelector(state => {
        const cartItems = state.cart.items;
        const { dishes } = state.dishes;
        const mappedData = cartItems.map(i => {
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
    });

    const onSumbit = async (formValue) => {
        const delivery_info = formValue;

        await dispatch(createOrder(delivery_info)).unwrap();;
        history.replace('/order-summary');
    };

    const onUpdateCart = (update) => {
        dispatch(updateCart(update)).unwrap();
    }

    const getCartItems = () => {
        return <div className={classNames(items.length > 0 ? 'w-2/5' : 'w-full', 'h-full flex flex-col bg-white overflow-y-auto ')}>
            <div className="flex-1 overflow-y-auto px-4">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">Giỏ hàng</div>
                </div>

                <div className="mt-8">
                    {items.length > 0 ?
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200">
                                {items.map((item) => <CartItem key={item.id} item={item} onUpdateItem={onUpdateCart} />)}
                            </ul>
                        </div>
                        : <EmptyList title="Giỏ hàng của bạn chưa có món ăn nào." />
                    }
                </div>
            </div>

        </div>
    }

    const getCartInfo = () => {
        const subTotal = items.reduce((total, current) => {
            return total + (current.amount) * (current.price);
        }, 0);

        const shippingFee = 20000;
        const total = subTotal + shippingFee;

        return (
            <div className={classNames(items.length > 0 ? 'w-3/5' : 'hidden')}>
                <Formik initialValues={delivery_info || {
                    name: '',
                    phone_number: '',
                    address: ''
                }}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={onSumbit}>
                    <Form>
                        <div className="text-lg font-medium text-gray-600 mb-12">Thông tin nhận hàng</div>
                        <div className="w-full bg-gray-100 rounded px-4 divide-y divide-gray-300">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Tên người nhận
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <Field name="name" >
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="text" placeholder="Nguyễn Văn A" {...field}
                                                    className={
                                                        "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" + (meta.touched && meta.error ? ' border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Số điện thoại
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <Field name="phone_number" >
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="text" placeholder="0968.xxx.xxxx" {...field}
                                                    className={
                                                        "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" + (meta.touched && meta.error ? ' border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="sm:border-t sm:border-gray-200 sm:py-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start ">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Địa chỉ
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <Field name="address" >
                                            {({
                                                field,
                                                form: { touched, errors },
                                                meta,
                                            }) => (
                                                <div>
                                                    <textarea cols={3} placeholder="ví dụ: 160 Phan Huy Ích, P12, Gò Vấp" {...field}
                                                        className={
                                                            "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" + (meta.touched && meta.error ? ' border-2 border-red-500' : '')
                                                        } />
                                                    {meta.touched && meta.error && (
                                                        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                    )}
                                                </div>
                                            )}
                                        </Field>
                                    </div>

                                </div>

                                <p className="my-3 text-sm text-gray-500 flex flex-row gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Hiện tại chúng tôi chỉ phục vụ khu vực nội thành TP Hồ Chí Minh.
                                </p>
                            </div>


                        </div>

                        <div className="py-6 text-lg font-medium text-gray-600">Thông tin giỏ hàng</div>
                        <div className="w-full bg-gray-100 rounded px-4 divide-y divide-gray-300">
                            <div className="flex flex-row justify-between py-8">
                                <div className="text-base font-medium text-gray-900">Tổng tiền sản phẩm</div>
                                <div className="text-base font-medium text-gray-900">{humanziePrice(subTotal)}</div>
                            </div>
                            <div className="flex flex-row justify-between py-8">
                                <div className="text-base font-medium text-gray-900">Phí ship (dự kiến)</div>
                                <div className="text-base font-medium text-gray-900">{humanziePrice(shippingFee)}</div>
                            </div>
                            <div className="pb-4">
                                <div className="flex flex-row justify-between py-8">
                                    <div className="text-base font-medium text-gray-900">Thành tiền</div>
                                    <div className="text-base font-medium text-gray-900">{humanziePrice(total)}</div>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 flex flex-row gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Đã bao gồm phí ship</p>
                                <div className="mt-6 w-100 text-center ">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Tiến hành đặt hàng
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to="menu">Tiếp tục mua<span aria-hidden="true"> &rarr;</span></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>

            </div>
        )
    }

    return (
        <div className="w-full py-8 px-4 flex justify-between mb-6 flex-row gap-8 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 shadow-lg my-12">
            {getCartItems()}
            {getCartInfo()}
        </div >
    )
}
