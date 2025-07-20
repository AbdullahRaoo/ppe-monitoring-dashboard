# 🦺 PPE Monitoring Dashboard

<div align="center">

![PPE Monitoring](https://img.shields.io/badge/PPE-Monitoring-orange?style=for-the-badge&logo=shield&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive Computer Vision-based Personal Protective Equipment (PPE) detection and monitoring dashboard built with modern web technologies.**

[🚀 Demo](#demo) • [📋 Features](#features) • [🛠️ Installation](#installation) • [📖 Usage](#usage) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 Overview

The PPE Monitoring Dashboard is a cutting-edge web application designed to monitor and analyze Personal Protective Equipment compliance in industrial environments. Using real-time computer vision technology, it tracks safety compliance across multiple sites and provides comprehensive analytics for safety managers.

### 🎯 Key Highlights

- **Real-time PPE Detection** - Monitor safety compliance in real-time
- **Multi-site Management** - Manage multiple construction/industrial sites
- **Advanced Analytics** - Comprehensive reporting and trend analysis
- **Modern UI/UX** - Built with shadcn/ui components and Tailwind CSS
- **Responsive Design** - Works seamlessly across all devices

---

## 🛠️ Tech Stack

### Frontend Framework
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) **Next.js 15.2.4** - React framework with App Router

### Core Libraries
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React 18.2.0** - UI library  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) **TypeScript 5.0** - Type-safe JavaScript  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI Components & Design System
![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=flat-square&logo=radix-ui&logoColor=white) **Radix UI** - Headless UI primitives  
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white) **shadcn/ui** - Modern component library  
![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white) **Lucide React** - Beautiful & consistent icons

### Data Visualization
![Recharts](https://img.shields.io/badge/Recharts-8DD6F9?style=flat-square&logo=chart.js&logoColor=white) **Recharts** - Composable charting library

### Form Management & Validation
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) **React Hook Form** - Performant forms  
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) **Zod** - TypeScript-first schema validation

### Package Manager
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white) **pnpm** - Fast, disk space efficient package manager

---

## ✨ Features

### 📊 Dashboard Overview
- **Real-time Metrics** - Live PPE compliance statistics
- **Site Performance** - Compliance rates across multiple sites
- **Trend Analysis** - Weekly and monthly compliance trends
- **Alert System** - Immediate notifications for safety violations

### 🏗️ Site Management
- **Multi-site Support** - Manage multiple construction/industrial sites
- **Site-specific Analytics** - Detailed compliance data per site
- **Worker Tracking** - Monitor individual worker compliance

### 📈 Advanced Analytics
- **PPE Type Analysis** - Compliance breakdown by equipment type (Hard Hat, Safety Vest, Gloves, etc.)
- **Time-based Trends** - Historical compliance data and patterns
- **Violation Reports** - Detailed incident reporting and analysis

### 👥 User Management
- **Role-based Access** - Different access levels for managers and operators
- **User Activity Logs** - Track user actions and system usage

### 🎨 Modern UI/UX
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Accessible Components** - WCAG compliant UI elements
- **Smooth Animations** - Enhanced user experience with Tailwind animations

---

## 🚀 Getting Started

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-16.0+-339933?style=flat-square&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-latest-F69220?style=flat-square&logo=pnpm&logoColor=white)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ppe-monitoring-dashboard.git
   cd ppe-monitoring-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

---

## 📁 Project Structure

```
ppe-monitoring-dashboard/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 analytics/          # PPE Analytics page
│   ├── 📁 logs/              # System logs
│   ├── 📁 monitoring/        # Live monitoring
│   ├── 📁 settings/          # Application settings
│   ├── 📁 sites/             # Site management
│   ├── 📁 users/             # User management
│   ├── 📄 layout.tsx         # Root layout
│   └── 📄 page.tsx           # Dashboard home
├── 📁 components/            # Reusable components
│   ├── 📁 ui/                # shadcn/ui components
│   ├── 📄 app-sidebar.tsx    # Navigation sidebar
│   └── 📄 theme-provider.tsx # Theme context
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility functions
├── 📁 public/                # Static assets
├── 📁 styles/                # Global styles
├── 📄 components.json        # shadcn/ui config
├── 📄 package.json           # Dependencies
├── 📄 tailwind.config.ts     # Tailwind configuration
└── 📄 tsconfig.json          # TypeScript config
```

---

## 🎨 Key Components

### Dashboard Overview
- **Metrics Cards** - Real-time statistics display
- **Charts & Graphs** - Interactive data visualization
- **Alert Feed** - Recent safety violations

### PPE Analytics
- **Compliance Breakdown** - Equipment-specific analysis
- **Trend Charts** - Historical compliance data
- **Performance Metrics** - Site and worker performance

### Live Monitoring
- **Real-time Feed** - Live camera monitoring
- **Instant Alerts** - Immediate violation notifications
- **Status Indicators** - System health monitoring

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="your_database_url"

# API Keys
NEXT_PUBLIC_API_KEY="your_api_key"

# Other configurations
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Animation utilities
- Component-specific styles
- Responsive breakpoints

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the amazing component library
- **Radix UI** - For accessible UI primitives
- **Recharts** - For beautiful data visualization
- **Lucide** - For consistent iconography
- **Tailwind CSS** - For utility-first styling

---

## 📞 Support

For support, email support@ppe-monitoring.com or join our Slack channel.

---

<div align="center">

**Built with ❤️ for workplace safety**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)

</div>
