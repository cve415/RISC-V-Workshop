# RISC-V Workshop Presentation Application

## Overview

This is a full-stack web application built to deliver an interactive RISC-V hands-on workshop presentation. The application features a modern document reader interface with a left sidebar table of contents, smooth scrolling navigation, and responsive design optimized for educational content delivery.

## User Preferences

Preferred communication style: Simple, everyday language.
UI/UX preferences: Modern, non-slide deck interactive design with left sidebar table of contents.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **Icons**: Lucide React icons

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with Vite middleware integration

### Key Components

#### Presentation System
- **Slide Management**: Centralized slide data with structured content types
- **Navigation**: Previous/next slide controls with keyboard support
- **Table of Contents**: Interactive slide overview with direct navigation
- **Responsive Design**: Mobile-optimized layout with touch gestures

#### Content Types
- Text blocks with formatting
- Bulleted lists with icon support
- Code blocks with syntax highlighting
- Grid layouts for structured content
- Timeline components for sequential information
- Quote blocks for emphasis
- Step-by-step instruction formats

#### UI Framework
- Consistent design system using shadcn/ui components
- Dark/light mode support with CSS custom properties
- Accessibility-focused components from Radix UI
- Form handling with React Hook Form and Zod validation

## Data Flow

### Client-Side Flow
1. React application bootstraps with main.tsx
2. App component sets up routing and global providers
3. Presentation page renders SlideDeck component
4. SlideDeck manages slide state and renders current slide content
5. Navigation components handle user interactions
6. Table of contents provides slide overview and jumping

### Server-Side Flow
1. Express server handles API routes under /api prefix
2. Vite middleware serves development assets
3. Static files served from dist/public in production
4. Database operations handled through storage interface
5. Session management for user state persistence

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI primitives
- **drizzle-orm**: Type-safe database queries
- **express**: Web server framework
- **react**: UI library
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Type safety and development experience
- **vite**: Build tool and development server
- **wouter**: Lightweight routing

### Development Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Error handling in development
- **@replit/vite-plugin-cartographer**: Replit-specific development features
- **drizzle-kit**: Database migrations and schema management
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- Runs on Node.js with hot reload via Vite
- Database migrations handled by Drizzle Kit
- Environment variables for database connection
- Development server combines Express API with Vite frontend

### Production Build
- Frontend built with Vite to dist/public
- Backend compiled with esbuild to dist/index.js
- Single Node.js process serves both API and static files
- Database connection via DATABASE_URL environment variable

### Database Schema
- Users table with authentication fields
- PostgreSQL with Drizzle ORM migrations
- Schema defined in shared/schema.ts for type safety
- Migrations stored in ./migrations directory

### Configuration
- TypeScript configuration supports both client and server code
- Path aliases for clean imports (@/, @shared/)
- Tailwind configured for client-side styling
- PostCSS setup for CSS processing
- ESLint and Prettier for code quality