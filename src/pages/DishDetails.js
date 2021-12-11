import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDishById, getCategories } from '../store/dish.store';
import ChooseAmount from '../components/ChooseAmount';
import { updateCart } from '../store/cart.store';
import { humanziePrice } from '../common/ultis';

export default function DisDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const dish = useSelector(state => state.dishes.dishes.find(d => d.id.localeCompare(id) === 0));
    const categories = useSelector(state => state.dishes.categories);

    const [note, setNote] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        dispatch(getDishById(id)).unwrap();
        dispatch(getCategories()).unwrap();
    }, []);

    const onSubmit = async () => {
        const newItem = {
            id,
            amount,
            note,
        };

        await dispatch(updateCart(newItem)).unwrap();
        history.replace('/cart');
    }

    const getBreadScrumbsView = () => {
        if (dish && categories) {
            const categoryName = categories.find(c => c.id.localeCompare(dish.category))?.name;

            return <nav aria-label="Breadcrumb">
                <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <span className="mr-2 text-sm font-medium text-gray-900">
                                {categoryName}
                            </span>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-4 h-5 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li className="text-sm">
                        <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                            {dish.name}
                        </span>
                    </li>
                </ol>
            </nav>
        }

        return <></>;
    }

    const getImageGalleyView = () => {
        return dish
            ? <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <img
                        src={dish.images[0]}
                        alt={dish.images[0]}
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                        <img
                            src={dish.images[1]}
                            alt={dish.images[1]}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                        <img
                            src={dish.images[1]}
                            alt={dish.images[1]}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img
                        src={dish.images[0]}
                        alt={dish.images[0]}
                        className="w-full h-full object-center object-cover"
                    />
                </div>
            </div> : <div className="animate-pulse mt-6 h-96 bg-gray-200 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8"></div>
    }

    const getDishDetailsView = () => {
        return dish
            ? <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{dish.name}</h1>
                </div>

                <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">
                        {humanziePrice(dish.price)}
                    </p>

                    <form className="mt-10">
                        <div className="mt-10">
                            <ChooseAmount initialValue={amount} onAmountChange={setAmount} />
                        </div>

                        <div className="mt-10">
                            <textarea
                                rows={4}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Ví dụ: thêm tương, gói riêng, ..."
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue={note}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onSubmit}
                            className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </form>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{dish.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="animate-pulse mt-16 bg-gray-200 max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            </div>
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                {getBreadScrumbsView()}

                {getImageGalleyView()}

                {getDishDetailsView()}
            </div>

        </div>
    )
}
