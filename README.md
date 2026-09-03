# Remob

Remob is a modern, fast, and visually engaging e-commerce web application built for buying, selling, and verifying mobile devices (iPhones, Androids, and refurbished phones). 

The platform features a custom-built routing system, smooth scrolling, and advanced scroll-triggered animations to deliver a premium user experience.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)

## Features

- **Storefront & Categories**: Browse through dedicated sections for iPhones, Androids, and special deals.
- **Sell & Verify**: Dedicated flows for users to sell their old devices and verify phone conditions.
- **Cart & Checkout**: A built-in cart provider to manage user purchases seamlessly.
- **Performance Optimized**: Uses a lightweight custom router and avoids unnecessary re-renders.
- **Premium UX**: Integrated GSAP animations combined with Lenis smooth scrolling for a native-feeling web experience.

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd remob
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Project Structure

- `src/pages/` - Contains all main views (Home, Shop, Cart, Profile, etc.)
- `src/components/` - Reusable UI components (Navbar, ScrollProgress, etc.)
- `src/lib/` - Custom hooks and utilities (Routing, Cart Context, GSAP setup, Lenis smooth scroll)
- `src/sections/` - Larger page blocks used across different pages
- `src/data/` - Static mock data or configurations

