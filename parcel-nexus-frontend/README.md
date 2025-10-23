# 📦 Parcel Nexus Frontend

A modern, responsive React frontend for the Parcel Nexus delivery management system. Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**, this application provides an intuitive interface for managing parcel deliveries with role-based access control.

---

**Live Demo:** [https://parcel-nexus-frontend.vercel.app](https://parcel-nexus-frontend.vercel.app)

---

## 🎯 Project Overview

Parcel Nexus Frontend is a comprehensive web application that serves as the user interface for a parcel delivery management system. It provides different dashboards and functionalities based on user roles (Admin, Sender, Receiver), ensuring secure and efficient parcel management.

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- **Secure Login/Register** with JWT-based authentication
- **Role-based Access Control** (Admin, Sender, Receiver)
- **HTTP-only Cookie Authentication** for enhanced security
- **Automatic Token Refresh** and session management

### 📊 **Admin Dashboard**
- **Analytics Dashboard** with interactive charts and statistics
- **User Management** - View, block/unblock, and assign roles to users
- **Parcel Management** - Comprehensive parcel oversight with status updates
- **Real-time Statistics** - Total parcels, users, delivery performance metrics

### 📦 **Parcel Management**
- **Create Parcels** with detailed recipient information
- **Track Parcels** with real-time status updates and history
- **Cancel Parcels** (for pending deliveries)
- **Public Tracking** - Track parcels without login using tracking numbers
- **Status Management** - Update parcel statuses with proper workflow

### 🎨 **User Experience**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **Interactive Charts** - Data visualization with Recharts
- **Real-time Updates** - Live data synchronization

### 📱 **Public Features**
- **Homepage** - Landing page with service information
- **About Page** - Company information and team details
- **Contact Page** - Inquiry form and contact information
- **Parcel Tracking** - Public tracking without authentication

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Redux Toolkit + RTK Query
- **Routing:** React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Notifications:** Sonner
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see [Backend README](../parcel-nexus-backend/README.md))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alifa-ara-heya/parcel-nexus.git
   cd parcel-nexus/parcel-nexus-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:5000/api/v1
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### 🧪 Test Credentials

For testing purposes, you can use these pre-configured accounts:

| Role | Email | Password | Access |
|------|-------|----------|---------|
| **Admin** | `test@admin.com` | `Abc@123` | Full system access, analytics, user & parcel management |
| **Sender** | `test@sender.com` | `Abc@123` | Create parcels, view sent parcels, track deliveries |
| **Receiver** | `test@recipient.com` | `Abc@123` | View incoming parcels, confirm deliveries |

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── modules/            # Feature-specific components
│   └── layouts/            # Layout components (Navbar, Footer, Sidebar)
├── pages/                  # Page components
│   ├── Admin/             # Admin-specific pages
│   ├── Home.tsx           # Landing page
│   ├── About.tsx          # About page
│   ├── Contact.tsx        # Contact page
│   └── ...
├── redux/                  # State management
│   ├── features/          # Feature-specific slices and APIs
│   └── hook.ts            # Typed hooks
├── routes/                 # Route configurations
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── lib/                    # External library configurations
└── assets/                 # Static assets
```

## 🎨 UI Components

The application uses a comprehensive set of UI components built with shadcn/ui:

- **Layout Components:** Sidebar, Navbar, Footer
- **Form Components:** Input, Button, Select, Textarea
- **Data Display:** Table, Card, Badge, Avatar
- **Feedback:** Toast, Alert Dialog, Loading Spinner
- **Navigation:** Breadcrumb, Tabs, Pagination

## 🔐 Authentication Flow

1. **Login:** User enters credentials
2. **Token Storage:** Access and refresh tokens stored in HTTP-only cookies
3. **Route Protection:** Protected routes check authentication status
4. **Role-based Access:** Different dashboards based on user role
5. **Auto Refresh:** Tokens automatically refreshed when needed

## 📊 Role-based Features

### 👑 **Admin**
- Analytics dashboard with charts and statistics
- User management (view, block/unblock, assign roles)
- Parcel management (view all, update status, block/unblock)
- System-wide oversight and control

### 📤 **Sender**
- Create new parcels
- View sent parcels with status tracking
- Cancel pending parcels
- Track delivery progress

### 📥 **Receiver**
- View incoming parcels
- Confirm parcel delivery
- Track parcel status

## 🌐 API Integration

The frontend integrates with the backend API using RTK Query:

- **Authentication API:** Login, register, logout, token refresh
- **User API:** User management, role assignment
- **Parcel API:** CRUD operations, status updates, tracking
- **Analytics API:** Dashboard statistics and metrics

## 🎯 Key Pages

### **Public Pages**
- **Home (`/`):** Landing page with service overview
- **About (`/about`):** Company information and team
- **Contact (`/contact`):** Contact form and information
- **Track (`/track`):** Public parcel tracking

### **Protected Pages**
- **Admin Dashboard (`/admin/analytics`):** Analytics and overview
- **User Management (`/admin/users`):** User administration
- **Parcel Management (`/admin/all-parcels`):** Parcel oversight
- **My Parcels (`/parcels`):** Sender's parcel management
- **Incoming Parcels (`/incoming-parcels`):** Receiver's parcels

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Environment Variables for Production
```env
VITE_BASE_URL=https://parcel-delivery-system-alpha.vercel.app/api/v1
```

## 🧪 Testing

The application includes comprehensive error handling and user feedback:

- **Form Validation:** Real-time validation with Zod schemas
- **Error Boundaries:** Graceful error handling
- **Loading States:** User feedback during API calls
- **Toast Notifications:** Success and error messages

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript:** Full type safety
- **ESLint:** Code linting and formatting
- **Prettier:** Code formatting
- **Husky:** Git hooks for code quality

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop:** Full-featured experience
- **Tablet:** Adapted layouts and touch interactions
- **Mobile:** Mobile-first design with optimized navigation

## 🎨 Theme Support

- **Light Mode:** Clean, professional appearance
- **Dark Mode:** Modern dark theme with proper contrast
- **Automatic Detection:** Respects system preferences
- **Manual Toggle:** User-controlled theme switching

## 🚀 Future Features

The following features are planned for future releases:

- **🔐 Google OAuth Login** - Social authentication with Google
- **✅ Email Verification** - Two-factor authentication for enhanced security
- **👤 User Verification System** - Default `isVerified` property set to `false`
- **🚚 Delivery Man Management** - Admin feature to manage delivery personnel
- **🎨 Enhanced Status Colors** - Improved visual indicators for parcel statuses
- **🔒 Private Parcel Views** - User-specific parcel viewing with enhanced privacy
- Optimization of the pages, currently the loading time is too slow
- File(image) uploading feature

## 🔗 Related Links

- **Backend API:** [parcel-nexus-backend](../parcel-nexus-backend/README.md)
- **Live Demo:** [https://parcel-nexus-frontend.vercel.app](https://parcel-nexus-frontend.vercel.app)
- **GitHub Repository:** [https://github.com/alifa-ara-heya/parcel-nexus](https://github.com/alifa-ara-heya/parcel-nexus)

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by [Alifa Ara Heya](https://github.com/alifa-ara-heya)**