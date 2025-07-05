'use client';

import { useState } from 'react'
import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations('Contact');
  const form = useTranslations('Contact.form');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [job, setJob] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!email || !company || !message) {
      setStatus(form('required'));
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    
    setStatus(form('sending'));
  
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, company, job, message }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setStatus(data.message);
        setName('');
        setEmail('');
        setCompany('');
        setJob('');
        setMessage('');
      } else {
        setStatus(form('error'));
      }
      
      // 设置3秒后清除状态消息
      setTimeout(() => setStatus(''), data.timeout || 3000);
    } catch (error) {
      console.error('Error:', error);
      setStatus(form('networkError'));
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl text-center">
                {t('title')}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color text-center">
                {t('subtitle')}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    {form('nameLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={form('namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    {form('emailLabel')}
                  </label>
                  <input
                    type="email"
                    placeholder={form('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="company"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    {form('companyLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={form('companyPlaceholder')}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="job"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    {form('jobLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={form('jobPlaceholder')}
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    {form('messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={form('messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>
                <div className="w-full">
                  <button type="submit" className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark w-full">
                    {form('submitButton')}
                  </button>
                </div>
              </form>
              {status && <p className="mt-4 text-center">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact