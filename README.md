# Blog App

A full-featured blog application built with React and Appwrite backend.

## Features

- **User Authentication** - Sign up, login, and logout functionality
- **Blog Management** - Create, read, update, and delete blog posts
- **Rich Text Editor** - TinyMCE integration for content creation
- **Image Upload** - Upload and manage images for blog posts
- **Protected Routes** - Authentication-based route protection
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Appwrite (Authentication, Database, Storage)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS, Shadcn UI
- **Forms**: React Hook Form
- **Editor (RTE)**: TinyMCE

## Getting Started

### Prerequisites

- Node.js
- Appwrite 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafa-sayyed/write-your-logs.git
   cd write-your-logs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Appwrite credentials:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── appwrite/       # Appwrite service configurations
├── components/     # Reusable UI components
├── config/         # App configuration
├── lib/            # Utility functions
├── pages/          # Page components
└── store/          # Redux store and slices
```

