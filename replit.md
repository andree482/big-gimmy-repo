# BigGimmy - E-commerce Integratori Sportivi

## Overview
BigGimmy is an e-commerce application specializing in sports supplements and fitness accessories. It manages a product catalog with multiple variants (flavors, formats), supports two physical stores (Turin and Aosta), and provides comprehensive product consultation and contact functionalities. The project aims to deliver a complete e-commerce solution for the sports nutrition market.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **UI Design System**: shadcn/ui based on Radix UI, custom color theme (yellow #FFD100, black #212121), Montserrat and Open Sans fonts, mobile-first responsive design.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **API Design**: RESTful endpoints with schema validation
- **Session Management**: Express-session with connect-pg-simple for PostgreSQL-backed persistent sessions
- **Authentication**: Hardcoded credentials with complete site access gate
- **File Serving**: Static file serving for product images.

### Authentication System
- **Access Control**: Complete authentication gate blocks ALL site access unless authenticated
- **Credentials**: Hardcoded authentication with two admin accounts (biggimmy, andrea)
- **Session Management**: PostgreSQL-backed sessions with 30-day expiration and rolling refresh
- **Frontend Protection**: AuthWrapper component enforces authentication on all routes
- **Security Features**: HttpOnly cookies, CSRF protection (SameSite), secure session handling

### Key Components
- **Product Management System**: Manages 10 product categories and multiple brands. Supports product variants (flavors, formats, prices) with intelligent selectors and slug-based image handling. Includes inventory tracking per variant.
- **Content Management**: Manages product catalog with detailed descriptions, physical store information, contact forms with automated email sending, and a gallery system for store and product images.
- **Database Schema**: Includes tables for Products, Product Variants, Product Images, Stores, and Contacts.

### Data Flow
- **Authentication Flow**: All access requires login → session creation in PostgreSQL → persistent authentication across all pages → logout destroys session
- **Product Display**: User navigates categories, products are queried and rendered, product clicks lead to detail pages with variant loading.
- **Contact Form**: User submission is validated, stored in the database, triggers SendGrid email notifications, and provides UI feedback.
- **Image Serving**: Images stored in `attached_assets/` are synced to `public/images/`, with automatic filename-to-slug mapping and placeholder fallbacks.
- **Content Display**: Frontend prioritizes dynamic data from the database for nutritional values and ingredients, with fallbacks to hardcoded tables where necessary.

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **Email Service**: SendGrid
- **Icons**: Lucide React, Font Awesome
- **Fonts**: Google Fonts (Montserrat, Open Sans)

### Development Tools
- **TypeScript**: For type safety.
- **ESLint + Prettier**: For code formatting and linting.
- **Drizzle Kit**: For database migrations and schema management.

### Deployment Infrastructure
- **Platform**: Replit (autoscale deployment)
- **Build Process**: Vite for frontend, ESBuild for server code.
- **Environment**: PostgreSQL 16, Node.js 20.

## Product Data Management Methodology

### Critical Product Insertion Procedure
The following standardized procedure must be followed for ALL product batch insertions to maintain data integrity and consistency:

### 1. Source Data Processing
- **File Reading**: Read .md files with maximum attention to detail
- **Text Fidelity**: Copy every field (name, slug, price, descriptions, nutritional values, usage instructions, ingredients, variants, warnings, characteristics) EXACTLY as written
- **No Interpretation**: Never modify or interpret texts - copy faithfully without changes
- **Complete Coverage**: Ensure all sections are included without omissions

### 2. Image Management Protocol  
- **Source Restriction**: Images must ONLY be taken from provided .zip files
- **Dual Placement**: Every product requires correct image both in category cover AND product detail page
- **No Placeholders**: Eliminate all placeholder or missing images
- **Authentic Mapping**: Use only brand-specific authentic images, never generic or cross-brand images

### 3. Database Insertion Standards
- **Structural Consistency**: Follow exact same logic as existing products (same variant format, keys, structure)
- **Variant Logic**: Combine flavors and formats correctly (e.g., Orange 300g, Orange 500g, Apple 300g, Apple 500g)
- **Data Integrity**: Avoid duplicate fields or inconsistent values
- **Schema Compliance**: Maintain consistency with existing database schema

### 4. Nutritional Data Formatting
- **Table Format**: Always display nutritional values in formatted tables
- **Style Consistency**: Tables must be identical in style to existing products
- **Complete Information**: Include all nutritional data from source files

### 5. Content Section Management
- **Separate Sections**: Insert ingredients, usage instructions, warnings, characteristics as separate sections
- **No Duplication**: Avoid repeating information across sections
- **Logical Organization**: Follow same content structure as existing products

### 6. Critical Errors to Avoid (Learned from Previous Insertions)
- **Duplicate Variants**: Never insert duplicate flavors as separate variants
- **Missing Images**: Never leave images missing or incorrect
- **Price Errors**: Always verify prices match source .md files exactly
- **Cover Price Updates**: Always update minimum visible prices in category covers
- **Incomplete Data**: Ensure all fields are populated from source data

### 7. Quality Assurance Protocol
- **Procedure Consistency**: Use identical procedure for every batch
- **Error Documentation**: Document and avoid repeating previous insertion errors
- **Verification Steps**: Verify each product has correct images, prices, variants, and complete data before finalizing

## Recent Product Corrections (August 5, 2025)

### Image and Variant Updates
- **GABA**: Updated to ProLabs authentic image (gaba-internal.jpg)
- **K2 + D3**: Removed multiple variants (30, 60, 120 compresse), kept only 100 compresse version with ProLabs image
- **Copertine Updates**: Fixed category covers for Vitamine & Minerals (+WATT) and Ashwagandha (Jamieson)

### Frontend-Backend Synchronization Resolution
- Completely rebuilt markdown parsing logic for nutritional tables
- Added priority rendering for database-stored features arrays over hardcoded values  
- Implemented dynamic ingredient and usage instruction rendering from markdown content
- All products with features arrays now display blue professional nutritional tables from database
- Cache invalidation implemented to ensure immediate visibility of database updates