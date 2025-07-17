# RISC-V Workshop - Interactive Document Reader

A modern, interactive web application that presents Paul Sherman's RISC-V hands-on workshop content in a beautiful document reader interface with smooth navigation and responsive design.

## ✨ Features

- **📖 Document Reader Interface** - Clean, modern layout optimized for reading and learning
- **🧭 Interactive Sidebar Navigation** - Always-visible table of contents with smooth scrolling
- **🎯 Scroll Spy** - Automatically highlights current section as you scroll
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Performance Optimized** - Uses Intersection Observer API and hardware acceleration
- **🎨 Beautiful Typography** - Inter font with optimized readability
- **🔍 Syntax Highlighting** - Code blocks with RISC-V assembly syntax highlighting
- **⌨️ Keyboard Navigation** - Arrow keys and spacebar for easy navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd risc-v-workshop
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Vite** for build tooling
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **PostgreSQL** with Neon serverless
- **Drizzle ORM** for database operations
- **TypeScript** throughout

## 📝 Content Structure

The workshop content is organized into interactive sections:

1. **Introduction** - Workshop overview and presenters
2. **Famous Abstractions** - Historical context and timeline
3. **What is RISC-V?** - Architecture introduction
4. **ISA Overview** - Instruction formats and registers
5. **Constants & Variables** - Data handling concepts
6. **Instruction Set** - Complete RISC-V instructions
7. **Quiz Section** - Interactive practice questions
8. **Extensions** - RISC-V ISA extensions
9. **SoC Integration** - System-on-chip architecture
10. **Development Setup** - Toolchain and workflow

## 🎨 Design Features

### Modern Document Reader
- Left sidebar with table of contents
- Smooth scrolling between sections
- Visual progress indicators
- Hover effects and transitions

### Content Types
- **Text blocks** with formatting
- **Interactive timelines** for historical context
- **Code examples** with syntax highlighting
- **Grid layouts** for structured information
- **Step-by-step guides** for procedures
- **Quote blocks** for emphasis

### Performance Optimizations
- Intersection Observer for scroll tracking
- Hardware-accelerated CSS transforms
- Throttled scroll event handling
- Lazy loading and smooth transitions

## 🔧 Development

### File Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and data
│   │   └── hooks/        # Custom React hooks
├── server/               # Backend Express application
├── shared/               # Shared types and schemas
└── README.md
```

### Key Components
- `SlideDeck` - Main document reader component
- `SlideNavigation` - Sidebar navigation
- `slide-data.ts` - Workshop content structure

### Styling
- CSS custom properties for theming
- Tailwind utilities for layout
- Custom animations and transitions
- Responsive breakpoints

## 🌟 Usage

### Navigation
- **Click** any section in the sidebar to jump directly to it
- **Scroll** naturally through the document
- **Use arrow keys** (↑/↓) to navigate between sections
- **Press spacebar** to move to the next section
- **On mobile**: Tap the hamburger menu to access the sidebar

### Features
- **Smooth scrolling** between sections
- **Active section highlighting** in the sidebar
- **Responsive design** adapts to any screen size
- **Touch-friendly** interface on mobile devices

## 🎯 Content Highlights

### RISC-V Architecture
- Comprehensive instruction set overview
- Register architecture and memory mapping
- ISA extensions and their purposes
- Development toolchain setup

### Interactive Elements
- Historical timeline of computing abstractions
- Instruction format comparisons
- Quiz questions with multiple formats
- Code examples with syntax highlighting

## 📱 Mobile Experience

- **Collapsible sidebar** with smooth animations
- **Touch-optimized scrolling** with momentum
- **Responsive typography** for readability
- **Mobile-first navigation** patterns

## 🚀 Deployment

The application is optimized for deployment on Replit and other modern hosting platforms:

1. **Frontend**: Built with Vite for optimal performance
2. **Backend**: Express server with database integration
3. **Database**: PostgreSQL with Neon serverless
4. **Environment**: Configured for production deployment

## 📄 License

This project contains educational content from the JCSSE2023 conference presentation by Naruemon Rattanakunakorn and Paul Sherman.

## 🙏 Acknowledgments

- **Presenters**: Naruemon Rattanakunakorn & Paul Sherman
- **Conference**: 20th International Joint Conference on Computer Science and Software Engineering
- **Institution**: Naresuan University, Pitsanulok, Thailand
- **Date**: 28th June – 1st July 2023

---

Built with ❤️ for the RISC-V community and educational purposes.
