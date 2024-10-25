"use client";
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentComponent = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const predefinedAmounts = [10, 50, 100, 500, 1000];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount('');
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePaymentStart = async () => {
    setIsLoading(true);
    setError('');
    const selectedAmount = Number(amount || customAmount);
    if (selectedAmount > 0 && paymentMethod) {
      try {
        const response = await fetch('/api/createPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: selectedAmount, currency: 'cny', paymentMethod }),
        });
        if (!response.ok) {
          throw new Error('支付创建失败');
        }
        const data = await response.json();
        if (data.paymentUrl) {
          // 对于微信和支付宝，重定向到支付链接
          window.location.href = data.paymentUrl;
        } else if (data.clientSecret) {
          // 对于其他支付方式，显示支付表单
          setClientSecret(data.clientSecret);
          setShowPaymentForm(true);
        }
      } catch (error) {
        console.error('创建支付意向时出错:', error);
        setError('创建支付失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('请选择金额和支付方式');
      setIsLoading(false);
    }
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || '支付过程中出现错误。');
      }

      setIsProcessing(false);
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || isProcessing} className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded">
          {isProcessing ? '处理中...' : '确认支付'}
        </button>
        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      </form>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">选择支付金额</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {predefinedAmounts.map((presetAmount) => (
          <button
            key={presetAmount}
            onClick={() => handleAmountSelect(presetAmount)}
            className={`py-2 px-4 border rounded ${
              amount === presetAmount.toString() ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            ${presetAmount}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="输入自定义金额"
        value={customAmount}
        onChange={handleCustomAmountChange}
        className="w-full p-2 border rounded mb-4"
      />

      <h2 className="text-2xl font-bold mb-4">选择支付方式</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {['wechat', 'alipay', 'card'].map((method) => (
          <button
            key={method}
            onClick={() => handlePaymentMethodSelect(method)}
            className={`py-2 px-4 border rounded ${
              paymentMethod === method ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {method === 'wechat' ? '微信' : method === 'alipay' ? '支付宝' : 'Visa'}
          </button>
        ))}
      </div>

      <button 
        onClick={handlePaymentStart}
        disabled={isLoading || (!amount && !customAmount) || !paymentMethod}
        className="w-full py-2 px-4 mt-4 bg-green-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? '处理中...' : '立即支付'}
      </button>

      {error && <div className="text-red-500 text-center mt-2">{error}</div>}

      {showPaymentForm && clientSecret && (
        <div className="mt-4">
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;