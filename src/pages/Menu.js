import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DishCollection from "../components/DishCollection";
import { getCategories, getDishes } from "../store/dish.store";
import * as _ from 'lodash';

export default function Menu() {

    const dispatch = useDispatch();
    const loading = useSelector(state => {
        const { dishLoading, categoryLoading } = state.dishes;
        return dishLoading && categoryLoading;
    });
    const groupedDishes = useSelector(state => {
        if (_.isEmpty(state.dishes.dishes) && _.isEmpty(state.dishes.categories)) {
            return [];
        }

        const grouped = _.chain(state.dishes.dishes)
            .groupBy('category')
            .map((value, key) => ({ categoryId: key, dishes: value }))
            .value();

        return grouped.map(g => {
            const category = state.dishes.categories.find(c => g.categoryId.localeCompare(c.id) === 0)?.name;

            return {
                ...g,
                category,
            }
        })
    });

    useEffect(() => {
        dispatch(getDishes()).unwrap();
        dispatch(getCategories()).unwrap();
    }, []);

    return (
        <div className="bg-white">
            {
                groupedDishes.map(group =>
                    <DishCollection key={group.categoryId} title={group.category} loading={loading} dishes={group.dishes}></DishCollection>
                )
            }
        </div>
    )
}
