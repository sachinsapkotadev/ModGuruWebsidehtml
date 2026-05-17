# LITEAPKS.COM React Application

A modern React application built with Vite, Tailwind CSS, and Firebase that replicates the LITEAPKS.COM website with admin panel functionality.

## Features

- **Modern React Application**: Built with React 19 and Vite for fast development
- **Firebase Authentication**: Secure login system for admin panel
- **Firebase Firestore**: Cloud database for storing apps, games, and collections
- **Admin Panel**: Full CRUD operations for managing apps and games
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **React Router**: Client-side routing for smooth navigation
- **Lucide Icons**: Beautiful icon library for UI elements

## Pages

- **Home**: Featured apps and collections
- **Apps**: Browse and search through all apps
- **Games**: Browse and search through all games
- **App Detail**: Detailed view of individual apps
- **Game Detail**: Detailed view of individual games
- **Admin**: Admin panel for managing content (requires authentication)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - (Optional) Enable Google sign-in
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create a database
   - Choose production mode or test mode
   - Set up security rules (see below)
5. Get your Firebase config:
   - Go to Project Settings → General → Your apps
   - Add a web app
   - Copy the firebaseConfig object

### 3. Configure Firebase

Update `src/firebase/firebaseConfig.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Create Admin User

1. Go to Firebase Console → Authentication
2. Click "Add user"
3. Enter email and password
4. This user will have access to the admin panel

### 6. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 7. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
liteapks-react/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── AppCard.jsx
│   │   ├── CollectionCard.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── context/           # React context
│   │   └── AuthContext.jsx
│   ├── firebase/          # Firebase configuration
│   │   ├── auth.js
│   │   ├── firebaseConfig.js
│   │   └── firestore.js
│   ├── pages/             # Page components
│   │   ├── Admin.jsx
│   │   ├── AppDetail.jsx
│   │   ├── Apps.jsx
│   │   ├── GameDetail.jsx
│   │   ├── Games.jsx
│   │   └── Home.jsx
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Admin Panel Features

- **Add Apps**: Create new app entries with name, category, icon, description, etc.
- **Edit Apps**: Modify existing app details
- **Delete Apps**: Remove apps from the database
- **Manage Games**: Similar CRUD operations for games (coming soon)
- **Manage Collections**: Organize apps into collections (coming soon)

## Data Structure

### App Document
```javascript
{
  name: "App Name",
  slug: "app-name",
  category: "Music & Audio",
  icon: "https://example.com/icon.png",
  coverImage: "https://example.com/cover.png",
  description: "App description",
  version: "1.0.0",
  size: "50 MB",
  badges: [
    { type: "editor", text: "Editor's Choice" },
    { type: "premium", text: "PREMIUM" }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Game Document
```javascript
{
  name: "Game Name",
  slug: "game-name",
  category: "Action",
  icon: "https://example.com/icon.png",
  coverImage: "https://example.com/cover.png",
  description: "Game description",
  version: "1.0.0",
  size: "100 MB",
  badges: [
    { type: "mod", text: "MOD" },
    { type: "online", text: "ONLINE" }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Technologies Used

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Firebase**: Authentication and database
- **Lucide React**: Icon library

## License

This project is a conversion of the original LITEAPKS.COM website for educational purposes.
