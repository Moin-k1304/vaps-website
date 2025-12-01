# VAPS Tech Website - Next.js

A modern, professional website for VAPS GROUP built with Next.js 14, TypeScript, and Tailwind CSS. This project has been migrated from vanilla HTML/CSS/JS to a component-based React architecture.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **Component-Based Architecture**: Modular and reusable components
- **Smooth Animations**: Custom animations and transitions
- **SEO Optimized**: Built-in metadata and SEO best practices
- **Performance Optimized**: Image optimization with Next.js Image component

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx   # Navigation header
│   │   └── Footer.tsx   # Footer component
│   └── sections/
│       ├── HeroSection.tsx       # Hero banner
│       ├── AboutSection.tsx      # About VAPS
│       ├── TechnologySection.tsx # Technology showcase
│       ├── ArchitectsSection.tsx # Architects section
│       ├── StatsSection.tsx      # Statistics display
│       └── TimelineSection.tsx   # Company timeline
├── public/
│   └── images/          # All image assets
├── hooks/
│   └── useScrollAnimation.ts    # Custom animation hook
└── tailwind.config.ts   # Tailwind configuration
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Key Components

### Header Component
- Fixed navigation with scroll effects
- Mobile-responsive hamburger menu
- Smooth scroll navigation links

### Hero Section
- Animated robot character
- Parallax scrolling effects
- Call-to-action buttons

### About Section
- Company information
- Animated infographics
- 25 years celebration animation

### Technology Section
- Interactive platform switcher
- Dashboard previews
- Product showcase

### Statistics Section
- Animated counters
- Hover effects
- Responsive grid layout

### Timeline Section
- Interactive timeline nodes
- Hover animations with particles
- Company history showcase

### Footer
- Newsletter subscription
- Contact information
- Social media links

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📝 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 3**: Utility-first CSS framework
- **React Hooks**: State and effect management
- **Next/Image**: Optimized image loading
- **Next/Font**: Optimized font loading

## 🎯 Migration Highlights

Successfully migrated from vanilla HTML/CSS/JS to Next.js with:
- Component-based architecture for better maintainability
- TypeScript for type safety
- Tailwind CSS for consistent styling
- React hooks for state management
- SEO optimization with Next.js metadata
- Performance improvements with code splitting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## 📄 License

 2024 VAPS GROUP. All rights reserved.
