# MealDash Frontend

The frontend web application for MealDash - a predictive meal planning system that helps food establishments forecast meal preparation quantities for maximum throughput and minimal waste.

## 🚀 Tech Stack

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 7.0.4** - Fast build tool and development server
- **ESLint** - Code linting and quality enforcement
- **CSS3** - Modern styling

## 📋 Features

- 🎯 **Meal Prediction Interface** - User-friendly form for inputting meals and dates
- 📊 **Results Dashboard** - Display predicted meal quantities and recommendations
- 📅 **Date Picker** - Easy date selection for prediction planning
- ⚡ **Real-time Validation** - Instant feedback on form inputs
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **API Integration** - Seamless connection to MealDash prediction API

## 🛠️ Quick Start

### Prerequisites

- **Node.js** (v20 or higher)
- **npm** or **yarn**

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production (TypeScript + Vite) |
| `npm run lint`    | Run ESLint to check code quality         |
| `npm run preview` | Preview production build locally         |

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/
│   ├── assets/            # Images, icons, and media
│   │   └── react.svg      # React logo
│   ├── App.css           # Main app styles
│   ├── App.tsx           # Root React component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # Vite environment types
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript config
├── tsconfig.node.json    # Node-specific TypeScript config
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🔌 API Integration

The frontend connects to the MealDash API server for meal predictions:

### Default API Endpoint

```
http://localhost:3000/api/predict
```

### Example API Call

```typescript
const response = await fetch("http://localhost:3000/api/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    meals: ["pasta", "salad"],
    date: "2025-07-19",
    confidence: 0.9,
  }),
});

const data = await response.json();
```

## 🎨 Development Guidelines

### Code Style

- **TypeScript** for type safety
- **Functional components** with React hooks
- **ESLint** rules enforced
- **Consistent naming** conventions

### Component Structure

```typescript
interface ComponentProps {
  // Define prop types
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // Component logic
  return <div>{/* JSX content */}</div>;
};

export default Component;
```

### State Management

- **useState** for local component state
- **useEffect** for side effects
- **Custom hooks** for reusable logic

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=MealDash
```

### TypeScript Configuration

The project uses multiple TypeScript configs:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application code
- `tsconfig.node.json` - Build tools

### Vite Configuration

Optimized for:

- Fast development server
- Hot module replacement
- Optimized production builds
- TypeScript support

## 🚀 Building for Production

1. **Create production build**

   ```bash
   npm run build
   ```

2. **Preview production build**

   ```bash
   npm run preview
   ```

3. **Deploy the `dist` folder** to your hosting platform

## 🧪 Testing

### Running Linter

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 📦 Dependencies

### Production Dependencies

- **react**: Core React library
- **react-dom**: React DOM rendering

### Development Dependencies

- **@vitejs/plugin-react**: Vite React plugin
- **typescript**: TypeScript compiler
- **eslint**: Code linting
- **@types/react**: React TypeScript definitions
- **@types/react-dom**: React DOM TypeScript definitions

## 🔮 Future Enhancements

- 📈 **Data Visualization** - Charts and graphs for meal trends
- 🎨 **UI Component Library** - Reusable component system
- 🔐 **Authentication** - User login and session management
- 📊 **Analytics Dashboard** - Historical prediction data
- 🌙 **Dark Mode** - Theme switching capability
- 📱 **PWA Support** - Progressive Web App features
- 🧪 **Unit Testing** - Jest and React Testing Library
- 🎭 **E2E Testing** - Playwright or Cypress integration

## 🤝 Contributing

1. Follow the existing code style
2. Run linting before committing
3. Ensure TypeScript compilation passes
4. Test your changes thoroughly

## 📞 API Integration Notes

Make sure the backend API server is running on `http://localhost:3000` before using the frontend application. The frontend expects the following API endpoints:

- `GET /api/` - API information
- `POST /api/predict` - Meal prediction endpoint

## 🐛 Troubleshooting

### Common Issues

**Port 5173 already in use**

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
# Or specify a different port
npm run dev -- --port 3001
```

**TypeScript errors**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm install
```

**Build errors**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```
