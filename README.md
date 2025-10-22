# 📦 Parcel Nexus

A comprehensive parcel delivery management system with modern web technologies. This full-stack application provides a complete solution for managing parcel deliveries, user roles, and real-time tracking with an intuitive admin dashboard and user-friendly interfaces.

---

## 🌟 Live Demo

**Frontend:** [https://parcel-nexus-frontend.vercel.app](https://parcel-nexus-frontend.vercel.app)  
**Backend API:** [https://parcel-delivery-system-alpha.vercel.app](https://parcel-delivery-system-alpha.vercel.app)  
**GitHub Repository:** [https://github.com/alifa-ara-heya/parcel-nexus](https://github.com/alifa-ara-heya/parcel-nexus)

---

## 🎯 Project Overview

Parcel Nexus is a modern parcel delivery management system that streamlines the entire delivery process from parcel creation to final delivery confirmation. The system features role-based access control, real-time tracking, comprehensive analytics, and a user-friendly interface designed for both administrators and end users.

### 🏗️ Architecture

This project consists of two main components:

- **Frontend** (`parcel-nexus-frontend/`) - React-based web application
- **Backend** (`parcel-nexus-backend/`) - Express.js API server

## ✨ Key Features

### 🔐 **Authentication & Security**
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin, Sender, Receiver)
- Secure password hashing with bcrypt
- Automatic token refresh mechanism

### 📊 **Admin Dashboard**
- Comprehensive analytics with interactive charts
- User management (view, block/unblock, role assignment)
- Parcel oversight with status management
- Real-time statistics and performance metrics

### 📦 **Parcel Management**
- Create and track parcels with detailed information
- Real-time status updates with history tracking
- Public parcel tracking without authentication
- Cancel pending parcels
- Admin controls for parcel blocking/unblocking

### 🎨 **User Experience**
- Responsive design for all devices
- Dark/Light mode toggle
- Modern UI with shadcn/ui components
- Interactive data visualization
- Real-time updates and notifications

### 🌐 **Public Features**
- Landing page with service information
- About page with company details
- Contact form and information
- Public parcel tracking system

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + **shadcn/ui** for styling
- **Redux Toolkit** + **RTK Query** for state management
- **React Router v6** for navigation
- **Recharts** for data visualization
- **React Hook Form** + **Zod** for form handling

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for request validation
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alifa-ara-heya/parcel-nexus.git
   cd parcel-nexus
   ```

2. **Set up the Backend:**
   ```bash
   cd parcel-nexus-backend
   npm install
   # Create .env file with required environment variables
   npm run start:dev
   ```

3. **Set up the Frontend:**
   ```bash
   cd ../parcel-nexus-frontend
   npm install
   # Create .env file with VITE_BASE_URL
   npm run dev
   ```

4. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
parcel-nexus/
├── parcel-nexus-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── redux/                 # State management
│   │   ├── routes/                # Route configurations
│   │   └── utils/                 # Utility functions
│   ├── public/                    # Static assets
│   └── package.json
├── parcel-nexus-backend/           # Express.js backend API
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/           # Feature modules (auth, user, parcel)
│   │   │   ├── middlewares/       # Express middlewares
│   │   │   └── utils/             # Utility functions
│   │   ├── config/                # Configuration files
│   │   └── server.ts              # Server entry point
│   └── package.json
└── README.md                      # This file
```

## 🎭 User Roles

### 👑 **Admin**
- Access to analytics dashboard
- User management (view, block/unblock, assign roles)
- Parcel management (view all, update status, block/unblock)
- System-wide oversight and control

### 📤 **Sender**
- Create new parcels
- View sent parcels with tracking
- Cancel pending parcels
- Track delivery progress

### 📥 **Receiver**
- View incoming parcels
- Confirm parcel delivery
- Track parcel status

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Token refresh
- `POST /api/v1/auth/logout` - User logout

### User Management
- `GET /api/v1/user/all-users` - Get all users (Admin)
- `PATCH /api/v1/user/:id/assign-role` - Assign user role (Admin)
- `PATCH /api/v1/user/:id/status` - Block/unblock user (Admin)

### Parcel Management
- `POST /api/v1/parcels` - Create parcel
- `GET /api/v1/parcels/me` - Get user's parcels
- `GET /api/v1/parcels/all` - Get all parcels (Admin)
- `GET /api/v1/parcels/track/:trackingNumber` - Public tracking
- `PATCH /api/v1/parcels/:id/cancel` - Cancel parcel
- `PATCH /api/v1/parcels/:id/update-delivery-status` - Update status

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployment from main branch
- Environment variables configured in Vercel dashboard
- Custom domain support

### Backend (Vercel)
- Serverless deployment with Vercel
- MongoDB Atlas for database
- Environment variables for production

## 🧪 Testing

### Frontend Testing
- Form validation with Zod schemas
- Error boundary implementation
- Loading states and user feedback
- Responsive design testing

### Backend Testing
- API endpoint testing with Postman
- Authentication flow testing
- Role-based access testing
- Error handling validation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop:** Full-featured experience with sidebar navigation
- **Tablet:** Adapted layouts with touch-friendly interactions
- **Mobile:** Mobile-first design with collapsible navigation

## 🎨 UI/UX Features

- **Modern Design:** Clean, professional interface
- **Dark/Light Mode:** Theme switching with system preference detection
- **Interactive Charts:** Data visualization with Recharts
- **Real-time Updates:** Live data synchronization
- **Toast Notifications:** User feedback for actions
- **Loading States:** Smooth user experience during API calls

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm run start:dev    # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
```

## 📊 Analytics & Monitoring

- **User Analytics:** Registration, login, and activity tracking
- **Parcel Statistics:** Delivery performance and status distribution
- **System Metrics:** API response times and error rates
- **Real-time Dashboard:** Live updates and statistics

## 🔐 Security Features

- **HTTP-only Cookies:** Secure token storage
- **CORS Configuration:** Cross-origin request handling
- **Input Validation:** Zod schema validation
- **Password Hashing:** bcryptjs for secure password storage
- **JWT Tokens:** Secure authentication mechanism

## 📄 Documentation

- **Frontend README:** [parcel-nexus-frontend/README.md](./parcel-nexus-frontend/README.md)
- **Backend README:** [parcel-nexus-backend/README.md](./parcel-nexus-backend/README.md)
- **API Documentation:** Available in backend README
- **Postman Collection:** [Run in Postman](https://app.getpostman.com/run-collection/40151578-f55ef070-67bc-4193-a0b6-a1c323611905?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D40151578-f55ef070-67bc-4193-a0b6-a1c323611905%26entityType%3Dcollection%26workspaceId%3De970fd7a-0c50-4374-8282-5d67086265e0)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alifa Ara Heya**
- GitHub: [@alifa-ara-heya](https://github.com/alifa-ara-heya)
- Project: [Parcel Nexus](https://github.com/alifa-ara-heya/parcel-nexus)

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for the hosting platform
- **MongoDB Atlas** for the database service
- **React** and **Express.js** communities for the excellent documentation

---

**Built with ❤️ by [Alifa Ara Heya](https://github.com/alifa-ara-heya)**

*Star ⭐ this repository if you found it helpful!*
