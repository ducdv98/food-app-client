import { Link } from "react-router-dom"

export default function EmptyList({ title, subTilte }) {
    return (
        <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
                <main className="sm:flex">
                    <div className="font-extrabold text-indigo-600 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{title}</h1>
                            <p className="mt-1 text-base text-gray-500">{subTilte}
                                <Link to="menu" className="ml-1 text-base font-medium text-indigo-600 hover:text-indigo-500">Chọn ngay những món ăn ngon thôi nào!</Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}