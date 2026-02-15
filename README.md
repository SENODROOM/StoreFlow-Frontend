# StoreFlow Frontend

<div align="center">

<img src="public/favicon.png" alt="StoreFlow Frontend" width="200" height="200">

**Modern, responsive frontend for the StoreFlow store management platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub issues](https://img.shields.io/github/issues/SENODROOM/StoreFlow-Frontend)](https://github.com/SENODROOM/StoreFlow-Frontend/issues)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)

[Features](#-features) • [Getting Started](#-getting-started) • [Contributing](#-contributing) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
  - [How to Contribute](#how-to-contribute)
  - [Development Setup](#development-setup)
  - [Code Standards](#code-standards)
  - [Component Guidelines](#component-guidelines)
  - [State Management](#state-management)
  - [Styling Guidelines](#styling-guidelines)
  - [Testing](#testing)
  - [Commit Guidelines](#commit-guidelines)
  - [Pull Request Process](#pull-request-process)
- [Project Structure](#-project-structure)
- [Component Library](#-component-library)
- [Routing](#-routing)
- [API Integration](#-api-integration)
- [Performance Optimization](#-performance-optimization)
- [Accessibility](#-accessibility)
- [Internationalization](#-internationalization)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**StoreFlow Frontend** is a modern, feature-rich web application built with React and TypeScript that provides an intuitive interface for managing retail store operations. It offers a seamless user experience across all devices with responsive design, real-time updates, and comprehensive store management capabilities.

### Why StoreFlow Frontend?

- **🎨 Modern UI/UX**: Beautiful, intuitive interface designed for efficiency
- **⚡ Fast & Responsive**: Optimized performance with lazy loading and code splitting
- **📱 Mobile-First**: Works flawlessly on all screen sizes
- **♿ Accessible**: WCAG 2.1 AA compliant for inclusivity
- **🌐 Internationalized**: Multi-language support out of the box
- **🔒 Secure**: Robust authentication and authorization
- **🎯 Type-Safe**: Built with TypeScript for reliability
- **🧪 Well-Tested**: Comprehensive test coverage

---

## ✨ Features

### User Interface

#### 🏪 Dashboard
- Real-time store analytics and KPIs
- Interactive charts and graphs
- Quick actions and shortcuts
- Recent activity feed
- Customizable widgets

#### 📦 Inventory Management
- Product catalog with search and filters
- Bulk product import/export
- Product image gallery with zoom
- Stock level indicators
- Low stock alerts
- Product variants and options
- Category management

#### 🛒 Order Management
- Order list with advanced filtering
- Order details with timeline
- Order status management
- Print packing slips and invoices
- Bulk order actions
- Order notes and comments

#### 💳 Point of Sale (POS)
- Quick product search
- Shopping cart with real-time calculations
- Multiple payment methods
- Customer lookup and selection
- Discount application
- Receipt printing
- Cash register management

#### 👥 Customer Management
- Customer directory with search
- Customer profiles with purchase history
- Loyalty points tracking
- Customer segmentation
- Email and SMS capabilities

#### 📊 Reports & Analytics
- Sales reports with date ranges
- Inventory turnover reports
- Customer analytics
- Staff performance metrics
- Export to CSV, Excel, PDF
- Custom report builder

#### 🔔 Notifications
- Real-time push notifications
- In-app notification center
- Email notifications
- Notification preferences

#### ⚙️ Settings
- Store configuration
- User management
- Role-based permissions
- Payment gateway settings
- Email templates
- Tax configuration

### Technical Features

- **Real-time Updates**: WebSocket integration for live data
- **Offline Support**: Service Worker for offline functionality
- **Progressive Web App**: Installable on mobile devices
- **Dark Mode**: System and manual theme switching
- **Keyboard Shortcuts**: Power user features
- **Print Optimization**: Clean print layouts
- **File Upload**: Drag-and-drop with preview
- **Data Export**: Multiple format support

---

## 🛠️ Tech Stack

### Core Technologies

- **Framework**: React 18.2+ with TypeScript 5.0+
- **Build Tool**: Vite 5.0+ (blazing fast builds)
- **Package Manager**: npm / yarn / pnpm

### UI & Styling

- **UI Library**: Material-UI (MUI) 5.14+ / Ant Design / Tailwind CSS
- **Styling**: CSS Modules / Styled Components / Emotion
- **Icons**: Material Icons / Lucide React / React Icons
- **Animations**: Framer Motion / React Spring

### State Management

- **Global State**: Redux Toolkit / Zustand / Jotai
- **Server State**: React Query / SWR
- **Form State**: React Hook Form
- **Async State**: Redux Thunk / Redux Saga

### Data & API

- **HTTP Client**: Axios / Fetch API
- **WebSocket**: Socket.io-client
- **API Layer**: Custom service layer with interceptors
- **Data Validation**: Zod / Yup

### Routing & Navigation

- **Router**: React Router v6
- **Route Guards**: Custom authentication HOCs
- **Lazy Loading**: React.lazy and Suspense

### Forms & Validation

- **Form Management**: React Hook Form
- **Validation**: Yup / Zod schemas
- **Form Builder**: Dynamic form generation

### Testing

- **Unit Testing**: Jest / Vitest
- **Component Testing**: React Testing Library
- **E2E Testing**: Cypress / Playwright
- **Visual Testing**: Storybook / Chromatic
- **Coverage**: Istanbul / c8

### Code Quality

- **Linting**: ESLint with recommended configs
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky + lint-staged
- **Commit Linting**: Commitlint

### Development Tools

- **Storybook**: Component development environment
- **DevTools**: Redux DevTools, React DevTools
- **API Mocking**: MSW (Mock Service Worker)
- **Bundle Analysis**: Rollup Plugin Visualizer

### Monitoring & Analytics

- **Error Tracking**: Sentry
- **Analytics**: Google Analytics / Mixpanel
- **Performance**: Web Vitals

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
```

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/SENODROOM/StoreFlow-Frontend.git
cd StoreFlow-Frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start development server
npm run dev

# 🎉 Open http://localhost:3000 in your browser
```

---

## 📦 Installation

### Standard Installation

```bash
# Clone the repository
git clone https://github.com/SENODROOM/StoreFlow-Frontend.git
cd StoreFlow-Frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Docker Installation

```bash
# Build Docker image
docker build -t storeflow-frontend .

# Run container
docker run -p 3000:3000 storeflow-frontend

# Or use Docker Compose
docker-compose up
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application
VITE_APP_NAME=StoreFlow
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
VITE_WS_URL=ws://localhost:5000

# Authentication
VITE_JWT_SECRET=your-jwt-secret
VITE_TOKEN_REFRESH_INTERVAL=300000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_PWA=true

# External Services
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
VITE_STRIPE_PUBLIC_KEY=pk_test_your-stripe-key
VITE_SENTRY_DSN=your-sentry-dsn

# Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_MIXPANEL_TOKEN=your-mixpanel-token

# Storage
VITE_STORAGE_PREFIX=storeflow_

# Misc
VITE_DEFAULT_LANGUAGE=en
VITE_DEFAULT_CURRENCY=USD
VITE_DATE_FORMAT=MM/DD/YYYY
VITE_TIME_FORMAT=12h
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:host         # Start dev server with network access

# Building
npm run build            # Build for production
npm run build:analyze    # Build and analyze bundle size
npm run preview          # Preview production build locally

# Testing
npm test                 # Run tests in watch mode
npm run test:ci          # Run tests once (CI mode)
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run E2E tests with UI

# Code Quality
npm run lint             # Lint all files
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run type-check       # Run TypeScript type checking

# Storybook
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for deployment

# Utilities
npm run clean            # Clean build artifacts
npm run update-deps      # Update dependencies
npm run analyze          # Analyze bundle
```

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing a typo, improving UI/UX, or adding a major feature, your help is appreciated.

### 🌟 Why Contribute?

- **Learn React & TypeScript**: Work with modern frontend technologies
- **Build Your Portfolio**: Showcase real-world project experience
- **Join the Community**: Connect with developers worldwide
- **Make an Impact**: Help businesses improve their operations
- **Get Recognition**: Featured in our contributors list

### How to Contribute

#### 1. Find an Issue or Feature

**Good places to start:**
- 🟢 Issues labeled [`good first issue`](https://github.com/SENODROOM/StoreFlow-Frontend/labels/good%20first%20issue)
- 🆘 Issues labeled [`help wanted`](https://github.com/SENODROOM/StoreFlow-Frontend/labels/help%20wanted)
- 🐛 [`bug`](https://github.com/SENODROOM/StoreFlow-Frontend/labels/bug) fixes
- 📖 [`documentation`](https://github.com/SENODROOM/StoreFlow-Frontend/labels/documentation) improvements
- ✨ [`enhancement`](https://github.com/SENODROOM/StoreFlow-Frontend/labels/enhancement) features

**Areas we especially need help with:**
- 🎨 UI/UX improvements and new components
- ♿ Accessibility enhancements
- 📱 Mobile responsiveness
- 🌐 Internationalization (i18n)
- 🧪 Test coverage
- 📚 Documentation
- 🚀 Performance optimization

#### 2. Set Up Your Development Environment

```bash
# Fork the repository on GitHub (click Fork button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/StoreFlow-Frontend.git
cd StoreFlow-Frontend

# Add upstream remote
git remote add upstream https://github.com/SENODROOM/StoreFlow-Frontend.git

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

#### 3. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/update-description` - Documentation
- `style/component-name` - Styling updates
- `test/component-name` - Adding tests
- `chore/task-description` - Maintenance tasks

#### 4. Make Your Changes

Follow our [code standards](#code-standards) and best practices:

- ✅ Write clean, readable code
- ✅ Follow TypeScript best practices
- ✅ Add proper type definitions
- ✅ Write unit tests for new features
- ✅ Update documentation
- ✅ Ensure all tests pass
- ✅ Follow component guidelines
- ✅ Test on multiple browsers
- ✅ Check mobile responsiveness

#### 5. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Check code formatting
npm run format:check
```

#### 6. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Stage your changes
git add .

# Commit with conventional commit message
git commit -m "feat(products): add product filtering by category"
```

**Commit message format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

**Examples:**
```bash
feat(dashboard): add real-time sales chart
fix(auth): resolve token refresh issue
docs(readme): update installation instructions
style(button): improve button hover effects
refactor(api): simplify API service layer
perf(products): optimize product list rendering
test(cart): add shopping cart unit tests
chore(deps): update React to 18.3.0
```

#### 7. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

### Development Setup

#### System Requirements

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn/pnpm)
- Git 2.30.0 or higher
- Modern code editor (VS Code recommended)

#### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "styled-components.vscode-styled-components",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "mikestead.dotenv",
    "orta.vscode-jest"
  ]
}
```

#### Initial Setup Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Development server running successfully
- [ ] Able to run tests
- [ ] Linting and formatting working
- [ ] Git hooks set up (Husky)

### Code Standards

#### TypeScript Guidelines

**1. Always Use TypeScript**

```typescript
// ❌ Bad - Using any
const fetchData = async (id: any) => {
  return await api.get(id);
};

// ✅ Good - Proper typing
const fetchData = async (id: string): Promise<Product> => {
  return await api.get<Product>(`/products/${id}`);
};
```

**2. Define Interfaces for Props and State**

```typescript
// ❌ Bad
const ProductCard = (props) => {
  return <div>{props.name}</div>;
};

// ✅ Good
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  className 
}) => {
  return (
    <div className={className}>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};
```

**3. Use Type Aliases for Complex Types**

```typescript
type Status = 'pending' | 'processing' | 'completed' | 'cancelled';

type OrderFilters = {
  status?: Status;
  dateFrom?: Date;
  dateTo?: Date;
  customerId?: string;
};

interface Order {
  id: string;
  status: Status;
  customer: Customer;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}
```

**4. Avoid Type Assertions When Possible**

```typescript
// ❌ Avoid when possible
const data = response.data as Product;

// ✅ Better - Let TypeScript infer
const response = await api.get<Product>(`/products/${id}`);
const data = response.data; // TypeScript knows this is Product
```

#### Component Guidelines

**1. Functional Components with TypeScript**

```typescript
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  featured = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div 
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
```

**2. Component File Structure**

```
src/components/ProductCard/
├── ProductCard.tsx           # Main component
├── ProductCard.test.tsx      # Tests
├── ProductCard.module.css    # Styles
├── ProductCard.stories.tsx   # Storybook stories
├── index.ts                  # Barrel export
└── types.ts                  # Component-specific types
```

**3. Component Organization**

```typescript
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/hooks';
import { formatCurrency } from '@/utils';
import type { Product } from '@/types';

// Types & Interfaces
interface ProductListProps {
  categoryId?: string;
  limit?: number;
}

// Component
export const ProductList: React.FC<ProductListProps> = ({ 
  categoryId, 
  limit = 10 
}) => {
  // Hooks (in order: state, context, custom hooks, effects)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery(['products', categoryId], 
    () => fetchProducts(categoryId)
  );

  // Memoized values
  const filteredProducts = useMemo(() => {
    return data?.filter(p => p.stock > 0) || [];
  }, [data]);

  // Callbacks
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // Effects
  useEffect(() => {
    // Side effects here
  }, [categoryId]);

  // Early returns
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState />;

  // Main render
  return (
    <div className="product-list">
      {filteredProducts.slice(0, limit).map(product => (
        <ProductCard
          key={product.id}
          product={product}
          selected={product.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
```

**4. Custom Hooks**

```typescript
// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/services';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useProducts = (category?: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.products.getAll(category);
      setProducts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return { products, loading, error, refetch: fetchProducts };
};
```

### State Management

#### Redux Toolkit Setup

```typescript
// store/slices/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { api } from '@/services';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedId: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    const response = await api.products.getAll(category);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { selectProduct, clearSelection } = productsSlice.actions;
export default productsSlice.reducer;
```

#### React Query Pattern

```typescript
// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '@/services';
import { Product, CreateProductDto } from '@/types';

export const useProducts = (category?: string) => {
  return useQuery(
    ['products', category],
    () => api.products.getAll(category),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateProductDto) => api.products.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
      },
    }
  );
};
```

### Styling Guidelines

#### CSS Modules

```typescript
// ProductCard.module.css
.card {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.featured {
  border-color: #1976d2;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

// Usage in component
import styles from './ProductCard.module.css';

const ProductCard = ({ product, featured }) => (
  <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
    <h3 className={styles.title}>{product.name}</h3>
  </div>
);
```

#### Tailwind CSS

```typescript
// Component with Tailwind
const ProductCard: React.FC<ProductCardProps> = ({ product, featured }) => {
  return (
    <div className={`
      p-4 border rounded-lg transition-transform hover:-translate-y-1
      ${featured ? 'border-blue-500 bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'border-gray-200'}
    `}>
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
};
```

#### Styled Components

```typescript
import styled from 'styled-components';

const Card = styled.div<{ featured?: boolean }>`
  padding: 1rem;
  border: 1px solid ${props => props.featured ? '#1976d2' : '#e0e0e0'};
  border-radius: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.featured && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `}
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProductCard = ({ product, featured }) => (
  <Card featured={featured}>
    <Title>{product.name}</Title>
  </Card>
);
```

### Testing

#### Unit Testing with React Testing Library

```typescript
// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import { mockProduct } from '@/test/fixtures';

describe('ProductCard', () => {
  const defaultProps = {
    product: mockProduct,
    onAddToCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard {...defaultProps} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', mockProduct.image);
  });

  it('calls onAddToCart when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);
    
    expect(defaultProps.onAddToCart).toHaveBeenCalledWith(mockProduct.id);
    expect(defaultProps.onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('applies featured styling when featured prop is true', () => {
    const { container } = render(
      <ProductCard {...defaultProps} featured={true} />
    );
    
    expect(container.firstChild).toHaveClass('featured');
  });

  it('shows out of stock message when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard {...defaultProps} product={outOfStockProduct} />);
    
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Integration Testing

```typescript
// ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductList } from './ProductList';
import { api } from '@/services';

jest.mock('@/services/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('ProductList', () => {
  it('displays loading state initially', () => {
    (api.products.getAll as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    
    render(<ProductList />, { wrapper });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays products after successful fetch', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 29.99 },
      { id: '2', name: 'Product 2', price: 39.99 },
    ];
    
    (api.products.getAll as jest.Mock).mockResolvedValue(mockProducts);
    
    render(<ProductList />, { wrapper });
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (api.products.getAll as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );
    
    render(<ProductList />, { wrapper });
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

#### E2E Testing with Cypress

```typescript
// cypress/e2e/products.cy.ts
describe('Product Management', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'password');
    cy.visit('/products');
  });

  it('displays product list', () => {
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('can search for products', () => {
    cy.get('[data-testid="search-input"]').type('canvas');
    cy.get('[data-testid="product-card"]').should('contain', 'canvas');
  });

  it('can add product to cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('button').contains('Add to Cart').click();
    });
    
    cy.get('[data-testid="cart-badge"]').should('contain', '1');
  });

  it('can create a new product', () => {
    cy.get('[data-testid="add-product-btn"]').click();
    
    cy.get('[name="name"]').type('New Product');
    cy.get('[name="description"]').type('Product description');
    cy.get('[name="price"]').type('49.99');
    cy.get('[name="stock"]').type('100');
    
    cy.get('[type="submit"]').click();
    
    cy.contains('Product created successfully').should('be.visible');
    cy.url().should('include', '/products');
  });
});
```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**

```bash
feat(products): add product filtering by category

Added dropdown filter to product list page that allows users to filter
products by category. Also added "All Categories" option to show all products.

Closes #123

---

fix(auth): resolve token refresh infinite loop

The token refresh was triggering on every 401 response, including failed
refresh attempts. Added check to prevent refresh on refresh endpoint.

Fixes #456

---

docs(readme): update installation instructions

Added troubleshooting section and clarified Node version requirements

---

perf(products): optimize product list rendering

Implemented virtualization for product list using react-window to improve
rendering performance for large product catalogs (1000+ items)

Before: 3.2s initial render
After: 0.8s initial render
```

### Pull Request Process

#### Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Code is formatted (`npm run format`)
- [ ] Manual testing completed
- [ ] Screenshots/GIFs added for UI changes
- [ ] Documentation updated if needed

#### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ♻️ Code refactoring
- [ ] ⚡ Performance improvement

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots/GIFs
<!-- Add screenshots or GIFs for UI changes -->

## Testing
### Test Coverage
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated

### Manual Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested with screen reader (accessibility)

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## Performance Impact
<!-- Describe any performance implications -->

## Additional Notes
<!-- Any additional information or context -->
```

#### Review Process

1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: Reviewer will test manually if needed
4. **Feedback**: Address all comments and suggestions
5. **Approval**: Once approved, maintainer will merge

---

## 📁 Project Structure

```
StoreFlow-Frontend/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── manifest.json
├── src/
│   ├── assets/            # Images, fonts, etc.
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/        # Reusable components
│   │   ├── common/        # Generic components (Button, Input, etc.)
│   │   ├── layout/        # Layout components (Header, Sidebar, etc.)
│   │   └── features/      # Feature-specific components
│   ├── pages/             # Page components
│   │   ├── Dashboard/
│   │   ├── Products/
│   │   ├── Orders/
│   │   ├── Customers/
│   │   └── Settings/
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   └── useDebounce.ts
│   ├── services/          # API services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── products.service.ts
│   │   └── orders.service.ts
│   ├── store/             # State management
│   │   ├── slices/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── api.types.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   ├── styles/            # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── themes/
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── routes/            # Route configuration
│   │   ├── index.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── routes.config.ts
│   ├── config/            # App configuration
│   │   ├── app.config.ts
│   │   └── api.config.ts
│   ├── locales/           # i18n translations
│   │   ├── en/
│   │   ├── es/
│   │   └── fr/
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── vite-env.d.ts      # Vite type definitions
├── tests/                 # Test utilities and fixtures
│   ├── fixtures/
│   ├── mocks/
│   └── setup.ts
├── cypress/               # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── .storybook/            # Storybook configuration
├── .github/               # GitHub workflows
│   └── workflows/
├── docs/                  # Documentation
├── .env.example           # Environment variables template
├── .eslintrc.cjs          # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── package.json
└── README.md
```

---

## 🎨 Component Library

We maintain a Storybook for component development and documentation:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Visit: http://localhost:6006

---

## 🗺️ Routing

```typescript
// routes/routes.config.ts
export const routes = {
  home: '/',
  dashboard: '/dashboard',
  products: {
    list: '/products',
    create: '/products/new',
    edit: (id: string) => `/products/${id}/edit`,
    detail: (id: string) => `/products/${id}`,
  },
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
  },
  customers: {
    list: '/customers',
    detail: (id: string) => `/customers/${id}`,
  },
  settings: '/settings',
  login: '/login',
  register: '/register',
} as const;
```

---

## 🔌 API Integration

```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## ⚡ Performance Optimization

- **Code Splitting**: Route-based splitting with React.lazy
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Regular bundle size monitoring
- **Memoization**: React.memo, useMemo, useCallback
- **Virtualization**: react-window for long lists
- **Lazy Loading**: Intersection Observer for images
- **Caching**: React Query with appropriate stale times

---

## ♿ Accessibility

We follow WCAG 2.1 Level AA guidelines:

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast ratios
- Skip to content links

---

## 🌐 Internationalization

```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en/translation.json') },
      es: { translation: require('./locales/es/translation.json') },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
```

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel deploy

# Deploy to Netlify
netlify deploy --prod
```

---

## 🐛 Troubleshooting

**Common Issues:**

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Module not found errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   npm run type-check
   ```

---

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline mode improvements
- [ ] Advanced analytics dashboard
- [ ] Multi-store management
- [ ] AI-powered recommendations
- [ ] Voice commands
- [ ] AR product preview

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **GitHub**: [SENODROOM](https://github.com/SENODROOM)
- **Email**: support@storeflow.com
- **Discord**: [Join our community](https://discord.gg/storeflow)
- **Twitter**: [@StoreFlowApp](https://twitter.com/storeflowapp)

---

## 🙏 Acknowledgments

Thank you to all our amazing contributors who have helped make StoreFlow better!

[![Contributors](https://contrib.rocks/image?repo=SENODROOM/StoreFlow-Frontend)](https://github.com/SENODROOM/StoreFlow-Frontend/graphs/contributors)

---

<div align="center">

**Built with ❤️ by the StoreFlow community**

[⬆ Back to top](#storeflow-frontend)

</div>
