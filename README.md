<div align="center">

# DevTinder - Where Developers Connect

### A full-stack developer networking platform with swipe-based matching, real-time chat, and premium memberships

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_v5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real_Time-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

[Live Demo](https://devtinder-web-five.vercel.app) · [Backend Repo](https://github.com/Chitransh1011/DEV_TINDER) · [Report Bug](https://github.com/Chitransh1011/DEV_TINDER/issues)

</div>

---

## About The Project

**DevTinder** is a Tinder-inspired platform built exclusively for developers. Discover fellow developers, swipe to connect, and chat in real-time — all wrapped in a modern glassmorphism UI with smooth animations.

This project demonstrates proficiency in building production-grade full-stack applications with real-time communication, payment gateway integration, session management, and responsive design.

### Key Highlights

- **Swipe-Based Discovery** — Browse developer profiles one card at a time with like/pass actions
- **Real-Time Chat** — Instant messaging powered by Socket.io with message persistence
- **Premium Memberships** — Razorpay-integrated payment flow with Silver & Gold tiers
- **Secure Authentication** — JWT + HTTP-only cookies with bcrypt password hashing
- **Automated Emails** — Cron-based email digests via Nodemailer for connection notifications
- **Responsive Design** — Mobile-first UI with glassmorphism effects and custom animations

---

## Tech Stack

### Frontend

| Technology | Purpose |
|:--|:--|
| **React 19** | UI library with functional components & hooks |
| **Redux Toolkit** | Global state management (user, feed, connections, requests) |
| **React Router v7** | Client-side routing with protected routes |
| **Socket.io Client** | Real-time bidirectional communication |
| **Axios** | HTTP client with cookie-based session handling |
| **TailwindCSS 3** | Utility-first responsive styling |
| **DaisyUI 5** | Pre-built component library |
| **date-fns** | Relative timestamp formatting |
| **Vite 7** | Lightning-fast build tooling & HMR |

### Backend ([Repository](https://github.com/Chitransh1011/DEV_TINDER))

| Technology | Purpose |
|:--|:--|
| **Express.js v5** | REST API framework |
| **MongoDB + Mongoose** | NoSQL database with schema validation |
| **Socket.io** | WebSocket server for real-time chat |
| **JWT + bcrypt** | Stateless auth with 10-round password hashing |
| **Razorpay SDK** | Payment processing with webhook verification |
| **Nodemailer** | SMTP email delivery via Gmail |
| **node-cron** | Scheduled tasks for email digests |
| **validator.js** | Server-side input validation |

---

## Features

### Authentication & Profiles
- Signup/Login with email & password
- JWT-based session management with HTTP-only secure cookies
- Editable profiles — name, photo, age, gender, bio, skills
- Live profile preview while editing

### Feed & Matching
- Paginated card-based feed of developer profiles
- Swipe right to send a connection request, left to pass
- Mutual interest creates a match
- Duplicate request prevention on the backend

### Connections & Requests
- View incoming connection requests with accept/reject actions
- Browse all accepted connections in a responsive grid
- Skills displayed as gradient tags on every profile card

### Real-Time Chat
- Socket.io powered instant messaging
- Room-based architecture for chat isolation
- Persistent message history loaded from MongoDB
- Auto-scroll, relative timestamps, and enter-to-send
- Premium-gated feature

### Premium Membership
- **Silver** (₹499/6 months) — 1000 requests/day, chat access, premium badge
- **Gold** (₹999/12 months) — Unlimited requests, gold badge, 24/7 support
- Razorpay checkout modal with webhook signature validation
- Premium badge displayed on profile cards and navbar

### UI/UX
- Glassmorphism cards with backdrop blur effects
- Custom animations — fade-in, slide-up, scale, floating, gradient shift
- Skeleton loaders and graceful empty states
- Mobile-responsive with adaptive layouts
- Dark theme with purple-pink gradient accents

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │   Feed   │  │   Chat   │  │ Profiles │  │  Premium   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │             │               │         │
│  ┌────▼──────────────▼─────────────▼───────────────▼──────┐  │
│  │              Redux Toolkit (Global State)              │  │
│  └────┬──────────────┬─────────────────────────────┬──────┘  │
│       │              │                             │         │
│   Axios/REST    Socket.io Client             Razorpay JS    │
└───────┼──────────────┼─────────────────────────────┼────────┘
        │              │                             │
   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ HTTPS / WSS ─ ─ ─ ─ ─ ─ ─ ─ ─
        │              │                             │
┌───────▼──────────────▼─────────────────────────────▼────────┐
│                     SERVER (Express v5)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Auth    │  │  Socket  │  │  Feed /  │  │  Payment   │  │
│  │  Routes  │  │  Server  │  │  Match   │  │  Webhooks  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │             │               │         │
│  ┌────▼──────────────▼─────────────▼───────────────▼──────┐  │
│  │           MongoDB Atlas (Mongoose ODM)                 │  │
│  │   Users  │  ConnectionRequests  │  Chats  │  Payments  │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

| Method | Endpoint | Description |
|:--|:--|:--|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate & receive JWT cookie |
| `POST` | `/logout` | Clear session cookie |
| `GET` | `/profile/view` | Get authenticated user's profile |
| `PATCH` | `/profile/edit` | Update profile fields |
| `GET` | `/feed` | Get paginated developer profiles |
| `POST` | `/request/send/:status/:userId` | Send interested/ignored request |
| `GET` | `/user/requests/recieved` | Fetch pending incoming requests |
| `POST` | `/request/review/:status/:requestId` | Accept/reject a request |
| `GET` | `/user/connections` | Get all accepted connections |
| `GET` | `/chat/:targetUserId` | Fetch chat message history |
| `POST` | `/payment/create` | Create Razorpay payment order |
| `GET` | `/premium/verify` | Verify premium membership status |

---

## Project Structure

```
devtinder-web/
├── src/
│   ├── components/
│   │   ├── Body.jsx              # Auth guard wrapper
│   │   ├── Login.jsx             # Login & signup forms
│   │   ├── NavBar.jsx            # Navigation with user dropdown
│   │   ├── Feed.jsx              # Swipeable card feed
│   │   ├── userCard.jsx          # Developer profile card
│   │   ├── Profile.jsx           # Profile page wrapper
│   │   ├── EditProfile.jsx       # Profile edit form with live preview
│   │   ├── Connections.jsx       # Matched connections grid
│   │   ├── Requests.jsx          # Incoming request list
│   │   ├── Chat.jsx              # Real-time chat interface
│   │   ├── Premium.jsx           # Membership plans & Razorpay checkout
│   │   ├── LastSeen.jsx          # Relative time display
│   │   └── Footer.jsx            # Site footer
│   ├── utils/
│   │   ├── appStore.js           # Redux store configuration
│   │   ├── userSlice.js          # User state slice
│   │   ├── feedSlice.js          # Feed state slice
│   │   ├── connectionSlice.js    # Connections state slice
│   │   ├── requestSlice.js       # Requests state slice
│   │   ├── constants.js          # API base URL config
│   │   └── socket.js             # Socket.io client factory
│   ├── App.jsx                   # Router & route definitions
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Custom Tailwind utilities & animations
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- Backend server running ([setup instructions](https://github.com/Chitransh1011/DEV_TINDER))

### Installation

```bash
# Clone the repository
git clone https://github.com/Chitransh1011/devtinderUI.git
cd devtinderUI/devtinder-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Environment Setup

Update the API base URL in `src/utils/constants.js`:

```javascript
export const BASE_URL = "http://localhost:3000"; // Local development
```

---

## Deployment

| Service | Platform |
|:--|:--|
| Frontend | [Vercel](https://vercel.com/) |
| Backend | [Render](https://render.com/) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

---

## What I Learned

- Architecting a full-stack application with separate frontend & backend deployments
- Implementing real-time communication with Socket.io (room-based architecture)
- Integrating Razorpay payment gateway with webhook signature verification
- Managing complex client state with Redux Toolkit across multiple slices
- Building responsive UIs with TailwindCSS and custom animation keyframes
- Handling JWT authentication with HTTP-only cookies across CORS origins
- Setting up automated email notifications with node-cron and Nodemailer

---

<div align="center">

Built by [Chitransh](https://github.com/Chitransh1011)

If you found this project interesting, consider giving it a star!

</div>
