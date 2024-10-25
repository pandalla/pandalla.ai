"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
  const [status, setStatus] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent');
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');

    if (payment_intent && payment_intent_client_secret) {
      // 这里可以向后端发送请求，验证支付状态
      setStatus('支付成功');
    } else {
      setStatus('支付状态未知');
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-2xl mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">支付结果</h1>
      {status ? (
        <p className="text-xl">{status}</p>
      ) : (
        <p className="text-xl">正在验证支付状态...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;