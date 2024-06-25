import React, { useEffect, useState } from 'react';

export default function CurrencySwapForm() {
    const [tokenPrices, setTokenPrices] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    const getFetch = async () => {
        try {
            const response = await fetch('https://interview.switcheo.com/prices.json');
            const data = await response.json();
            setTokenPrices(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching token prices:", error);
        }
    };

    useEffect(() => {
        getFetch();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const fromRate = tokenPrices.find(token => token.currency === fromCurrency)?.price || 1;
        const toRate = tokenPrices.find(token => token.currency === toCurrency)?.price || 1;
        const convertedAmount = (amount / fromRate) * toRate;
        setResult(convertedAmount.toFixed(2));
    };

    return (
        <>
            <div className="container">
                <h1>Currency Swap</h1>
                <form id="swapForm" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="fromCurrency">From Currency:</label>
                        <select
                            id="fromCurrency"
                            name="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select currency</option>
                            {tokenPrices.map((tokenPrice, index) => (
                                <option key={index} value={tokenPrice.currency}>{tokenPrice.currency}</option>
                            ))}
                        </select>
                        <div className="error" id="fromCurrencyError" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="toCurrency">To Currency:</label>
                        <select
                            id="toCurrency"
                            name="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select currency</option>
                            {tokenPrices.map((tokenPrice, index) => (
                                <option key={index} value={tokenPrice.currency}>{tokenPrice.currency}</option>
                            ))}
                        </select>
                        <div className="error" id="toCurrencyError" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <div className="error" id="amountError" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="result">Result:</label>
                        <input
                            type="text"
                            id="result"
                            name="result"
                            value={result}
                            readOnly
                        />
                    </div>
                    <button type="submit">Swap</button>
                </form>
            </div>
        </>
    );
}
