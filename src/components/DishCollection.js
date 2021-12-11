import DishItem from "./DishItem";

const DishSkeleton = (key) => {
    return <div key={key} className="group relative animate-pulse">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <div className="bg-gray-100 w-full h-full object-center object-cover lg:w-full lg:h-full">
            </div>
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">
                    <span>
                        <span aria-hidden="true" className="absolute inset-0" />
                    </span>
                </h3>
            </div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
    </div>
}

export default function DishCollection({ title, dishes, loading }) {
    const view = loading
        ?
        <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{title}</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {[1, 2, 3, 4].map((_, index) => <DishSkeleton key={index}></DishSkeleton>)}
                {[1, 2, 3, 4].map((_, index) => <DishSkeleton key={index}></DishSkeleton>)}
            </div>
        </div>
        :
        <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{title}</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {dishes.map((dish) => <DishItem key={dish.id} dish={dish}></DishItem>)}
            </div>
        </div>;

    return view;
}