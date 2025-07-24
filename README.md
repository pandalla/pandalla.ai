# Pandalla.ai

A modern, multilingual platform for high-quality data generation and AI services. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **🌍 Multilingual Support**: Full internationalization with English, Chinese, and Japanese
- **🎨 Modern Design**: Clean, professional interface with dark/light mode
- **📱 Responsive**: Optimized for all devices and screen sizes
- **⚡ Performance**: Built with Next.js 14 for optimal performance
- **🎭 Animations**: Smooth animations and transitions using Framer Motion
- **🔍 SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Icons**: React Icons
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/pandalla/pandalla.ai.git
cd pandalla.ai
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header/           # Navigation header
│   ├── Footer/           # Site footer
│   ├── LanguageSwitcher/ # Language selection
│   └── ...
├── i18n/                 # Internationalization config
├── messages/             # Translation files
│   ├── en.json          # English translations
│   ├── zh.json          # Chinese translations
│   └── ja.json          # Japanese translations
└── middleware.ts         # Next.js middleware
```

## 🌐 Internationalization

The application supports three languages:
- 🇺🇸 English (en)
- 🇨🇳 Chinese (zh)
- 🇯🇵 Japanese (ja)

Language switching is handled automatically with locale-based routing.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🎨 Customization

### Adding New Languages

1. Add new locale to `src/i18n/request.ts`
2. Create translation file in `src/messages/`
3. Update middleware matcher in `src/middleware.ts`
4. Add language option to `LanguageSwitcher` component

### Styling

The project uses Tailwind CSS with custom configurations. Modify `tailwind.config.js` to customize the design system.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
