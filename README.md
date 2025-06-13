# Ali-Reddit

A full-featured Reddit clone built with modern web technologies. This
application replicates core Reddit functionality including subreddits, posts
with rich text, commenting, voting, and user authentication.

![Ali-Reddit Banner](https://vfnoldgvdtsrlehwaxro.supabase.co/storage/v1/object/public/alireddit-buket//alireddit-banner.png)

## Features

- **User Authentication**
  - Email/password sign-up and login
  - User sessions management
  - Protected routes

- **Subreddits**
  - Create new communities (subreddits)
  - Subscribe/unsubscribe to communities
  - Browse subreddit content

- **Posts and Content**
  - Create posts with rich text editor (EditorJS)
  - Upvote/downvote system

- **Comments**
  - Nested comment threads
  - Reply to comments
  - Upvote/downvote comments

- **User Interface**
  - Responsive design for all devices
  - Light/dark mode support
  - Accessible UI components

## Technologies

- **Frontend**:
  - [Next.js](https://nextjs.org/) (v15.x) - React framework with App Router
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [TailwindCSS](https://tailwindcss.com/) - Styling
  - [Radix UI](https://www.radix-ui.com/) - UI components
  - [React Query](https://tanstack.com/query/latest) - Data fetching

- **Backend**:
  - [Next.js App Router API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  - [Prisma](https://www.prisma.io/) - ORM and database access
  - [NextAuth.js](https://next-auth.js.org/) - Authentication

- **Database**:
  - PostgreSQL (via Prisma)

- **Additional Tools**:
  - [Zod](https://zod.dev/) - Form validation
  - [EditorJS](https://editorjs.io/) - Rich text editor
  - [uploadthing](https://uploadthing.com/) - File uploads
  - [Lucide React](https://lucide.dev/) - Icons

## Installation

### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL database

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/engalisabry/ali-reddit.git
   cd ali-reddit
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory with the following variables:

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/reddit_clone"
   DIRECT_URL="postgresql://username:password@localhost:5432/reddit_clone"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # File Uploads
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   ```

4. **Database Setup**

   ```bash
   pnpm prisma migrate dev --name init
   ```

5. **Start Development Server**

   ```bash
   pnpm run dev
   ```

6. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm prisma studio` - Open Prisma database GUI
- `pnpm prisma migrate dev` - Run database migrations

### Tools

- **VSCode Extensions**:

  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

- **Browser Extensions**:
  - React Developer Tools
  - Redux DevTools (if using Redux)

### Project Structure

```
ali-reddit/
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── (auth)/     # Auth routes
│   │   ├── @authModel/ # Auth intercepting routes
│   │   ├── r/          # Subreddit routes
│   │   └── settings/   # User settings
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles
├── .env                # Environment variables (not committed)
├── components.json     # Shadcn UI configuration
├── netlify.toml        # Netlify deployment configuration
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
└── tailwind.config.js  # Tailwind CSS configuration
```

## Main API Routes

- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/subreddit` - Subreddit management
- `/api/subreddit/post/create` - Create posts
- `/api/subreddit/post/vote` - Vote on posts
- `/api/subreddit/post/comment` - Comments management
- `/api/subreddit/post/comment/vote` - Vote on comments
- `/api/subreddit/subscribe` - Subscribe to subreddit
- `/api/subreddit/unsubscribe` - Unsubscribe from subreddit
- `/api/uploadthing` - File uploads

## Deployment

### Netlify Deployment

1. Create a Netlify account and connect your GitHub repository.
2. Add all required environment variables in the Netlify dashboard.
3. The deployment is configured using the `netlify.toml` file with the following settings:
   - Build Command: `pnpm install && pnpm prisma generate && pnpm build`
   - Publish Directory: `.next`
   - Node Version: 18

## Troubleshooting

### Common Issues

- **Database Connection Errors**
  - Verify your DATABASE_URL and DIRECT_URL in the .env file
  - Ensure the database server is running

- **Prisma Errors**
  - Run `pnpm prisma generate` after schema changes
  - Ensure migrations are applied with `pnpm prisma migrate dev`

- **Authentication Issues**
  - Confirm NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly

## Contributing

Contributions to improve Ali-Reddit are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a pull request

Please follow the existing code style and write meaningful commit messages.
