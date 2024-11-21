import Image from 'next/image'
import Link from 'next/link'

const logos = [
  '/omniai/brands/openai_logo.svg',
  '/omniai/brands/claude_logo.svg',
  '/omniai/brands/qwen_logo.svg',
  '/omniai/brands/mistral_logo.svg',
  '/omniai/brands/stability_logo.svg',
  '/omniai/brands/suno_logo.svg',
];

export default function OmniAI() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-[5%] py-4 bg-white/95 fixed top-0 w-full z-50">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          OmniAI
        </div>
        <div className="flex gap-8 items-center">
          <Link href="https://apidoc.pandalla.ai" className="text-sm text-gray-900 hover:text-blue-600 transition-colors">
            文档
          </Link>
          <Link href="https://api.pandalla.ai/pricing" className="text-sm text-gray-900 hover:text-blue-600 transition-colors">
            模型价格
          </Link>
          <Link href="https://api.pandalla.ai/topup" className="text-sm text-gray-900 hover:text-blue-600 transition-colors">
            余额
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-[5%] text-center relative min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        便捷且高效地<br />访问所有AI模型
      </h1>
      <div className="text-6xl md:text-7xl font-bold my-8 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
        OmniAI
      </div>
      <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-700 leading-relaxed">
        以更实惠的价格提供企业级API服务，所有主流AI模型一站式访问！
      <p>
        完全兼容各平台接口，零开发基础即可轻松接入。
      </p>
        不用担心网络问题，稳定快速，高效整合资源，助您轻松实现AI应用！！
      </p>
        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="https://api.pandalla.ai/token"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            立即开始
          </Link>
          <Link
            href="https://apidoc.pandalla.ai"
            className="px-8 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            查看文档
          </Link>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6">支持以下平台商（更多供应商整合中）</p>
          <div className="flex justify-center gap-8 flex-wrap">
            {logos.map((src, i) => (
              <div key={i} className="w-24 h-24 flex items-center justify-center">
                <img 
                  src={src}
                  alt={`Logo ${i + 1}`}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/5 left-[10%] w-2 h-2 rounded-full bg-yellow-400" />
        <div className="absolute top-2/5 right-[15%] w-2 h-2 rounded-full bg-blue-400" />
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 rounded-full bg-green-400" />
      </section>
    </div>
  )
}