'use client';

import { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [job, setJob] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
  
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
        setStatus('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl text-center">
                Need Help? Send Us a Message
              </h2>
              <p className="mb-12 text-base font-medium text-body-color text-center">
                Our support team will get back to you by email as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
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
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="company"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Company/Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company or organization name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="job"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your job title"
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
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  ></textarea>
                </div>
                <div className="w-full">
                  <button type="submit" className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark w-full">
                    Send Message
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