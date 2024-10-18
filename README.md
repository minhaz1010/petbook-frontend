# Pet Care Tips & Stories - Frontend

## 🐾 Project Overview

Pet Care Tips & Stories is a comprehensive web application designed to connect pet owners, share valuable pet care advice, and foster a community of animal lovers. This repository contains the front-end code for the project, built with modern web technologies to ensure a responsive, interactive, and user-friendly experience.

## 🚀 Technologies Used

- [Next.js ](https://nextjs.org/) with App Router for efficient, server-side rendered React applications
- [TypeScript](https://www.typescriptlang.org/) for type-safe code
- [Shadcn UI](https://ui.shadcn.com/) for beautiful, customizable UI components
- [Clerk](https://clerk.dev/) for secure authentication with role based configuration
- [React Query](https://react-query.tanstack.com/) for efficient server state management and hydration
- [Axios](https://axios-http.com/) for HTTP requests
- [React Quill](https://github.com/zenoamaro/react-quill) as a rich text editor for content creation
- [Cloudinary](https://cloudinary.com/) for image upload and management

## 📋 Features

- User authentication and profile management
- Create, read, update, and delete pet care tips and stories
- Rich text editing for content creation
- Image upload functionality
- Infinite scrolling for content feeds
- Responsive design for optimal viewing on all devices
- Server-side rendering and hydration for improved performance
- Advanced search and filtering options
**(useDebounce effect)**

## 🛠 Installation

1. Clone the repository:
   ```
   https://github.com/minhaz1010/petbook-frontend.git
   cd petbook-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   bun install

   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   BASE_URL= 
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ✌️ Backend Repository
[Backend-Repo](https://github.com/minhaz1010/Pet-Social-Backend)

## 🌟 Key Features Explained

### Server-Side Rendering and Hydration

I have leveraged Next.js  App Router for efficient server-side rendering. This approach, combined with React Query's hydration capabilities, ensures fast initial page loads and smooth client-side navigation.

### Infinite Query

Implemented using React Query's `useInfiniteQuery`, this feature allows for seamless loading of content as users scroll, enhancing the browsing experience without overwhelming the server or the client.

### Rich Text Editing

React Quill is integrated to provide a powerful, user-friendly interface for creating and editing pet care tips and stories. This ensures that content creators can easily format their posts and include various media types.

### Responsive Design

The application is built with a mobile-first approach, ensuring a consistent and optimal user experience across devices of all sizes. I have used Tailwind CSS for efficient, responsive styling.

### TypeScript Integration

TypeScript is used throughout the project to ensure type safety.




---

Built with ❤️ for pets and their humans
