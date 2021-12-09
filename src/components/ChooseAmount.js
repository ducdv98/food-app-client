import { useState } from "react"

export default function ChooseAmount({ type = 'small' | 'normal', initialValue, onAmountChange }) {

    const [amount, setAmount] = useState(initialValue);

    const increaseAmount = () => {
        onAmountChange(amount + 1);
        setAmount(amount + 1);
    }

    const descreasseAmount = () => {
        if (amount === 1) {
            return;
        }
        onAmountChange(amount - 1)
        setAmount(amount - 1);
    }

    return <div className="flex flex-row w-full items-center h-8">
        <button className="text-gray-500" onClick={() => descreasseAmount()} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        <input className={
            'border rounded mx-2 text-lg text-gray-900 w-3/12 text-center focus:outline-none amount ' +
            (type === 'small' ? 'py-1 w-3/12' : 'w-4/12 py-2')
        }
            value={amount} type="number" readOnly
        />
        <button className="text-gray-500" onClick={() => increaseAmount()} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </div>
}