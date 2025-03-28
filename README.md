# Ali-Reddit

A full-featured Reddit clone built with modern web technologies. This
application replicates core Reddit functionality including subreddits, posts
with rich text, commenting, voting, and user authentication.

![Ali-Reddit Banner](https://placeholder-for-banner-image.com)

## Features

- **User Authentication**

  - Email/password sign-up and login
  - OAuth social login
  - User sessions management
  - Protected routes

- **Subreddits**

  - Create new communities (subreddits)
  - Subscribe/unsubscribe to communities
  - Browse subreddit content
  - Customizable subreddit settings

- **Posts and Content**

  - Create posts with rich text editor
  - Upload images and media
  - Upvote/downvote system
  - Sorting options (trending, new, top)

- **Comments**

  - Nested comment threads
  - Reply to comments
  - Upvote/downvote comments

- **User Profiles and Customization**

  - Personal user profiles
  - Avatar and banner customization
  - Activity history
  - Preferences management

- **Search Functionality**

  - Advanced search across posts, comments, and subreddits
  - Filtering by date, popularity, and content type
  - Real-time search suggestions

- **Notifications System**

  - Real-time notifications
  - Customizable notification preferences
  - Activity digest emails
  - @mentions and reply notifications

- **User Interface**
  - Responsive design for all devices
  - Intuitive navigation
  - Feed customization

## Technologies

- **Frontend**:

  - [Next.js](https://nextjs.org/) (v13.4) - React framework
  - [TypeScript](https://www.typescriptlang.org/) (v5.x) - Type safety
  - [TailwindCSS](https://tailwindcss.com/) (v3.x) - Styling
  - [Radix UI](https://www.radix-ui.com/) (v1.x) - UI components
  - [React Query](https://tanstack.com/query/latest) (v4.x) - Data fetching

- **Backend**:

  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) -
    Backend API
  - [Prisma](https://www.prisma.io/) (v4.x) - ORM and database access
  - [NextAuth.js](https://next-auth.js.org/) (v4.x) - Authentication

- **Database**:

  - PostgreSQL/MySQL/SQLite (via Prisma)

- **Additional Tools**:
  - [Zod](https://zod.dev/) (v3.x) - Form validation
  - [EditorJS](https://editorjs.io/) - Rich text editor
  - [uploadthing](https://uploadthing.com/) - File uploads
  - [ESLint](https://eslint.org/) - Code linting
  - [Prettier](https://prettier.io/) - Code formatting

## Screenshots

_Screenshots will be added soon_

<!--
Examples to be added:
- Home feed view
- Subreddit view
- Post creation
- Comment section
- User profile
-->

## Installation

### Prerequisites

- Node.js (v16+)
- pnpm (v7+)
- PostgreSQL/MySQL database (or use SQLite for development)

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

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

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
├── .github/            # GitHub configuration
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   └── (routes)/   # App routes
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles
├── .env                # Environment variables (not committed)
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore rules
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login (handled by NextAuth)
- `GET /api/auth/session` - Get current session

### User Profile Management

- `GET /api/users/[username]` - Get user profile
- `PUT /api/users/[username]` - Update user profile
- `GET /api/users/[username]/posts` - Get posts by user
- `GET /api/users/[username]/comments` - Get comments by user
- `PUT /api/users/preferences` - Update user preferences
- `POST /api/users/avatar` - Update user avatar
- `POST /api/users/banner` - Update user banner

### Subreddits

- `GET /api/subreddit` - List subreddits
- `POST /api/subreddit` - Create subreddit
- `GET /api/subreddit/[name]` - Get subreddit details
- `POST /api/subreddit/subscribe` - Subscribe to subreddit
- `POST /api/subreddit/unsubscribe` - Unsubscribe from subreddit

### Posts

- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get post details
- `POST /api/posts/vote` - Vote on post

### Comments

- `GET /api/posts/[postId]/comments` - Get comments for post
- `POST /api/posts/[postId]/comments` - Add comment
- `POST /api/comments/vote` - Vote on comment

## Deployment

### Vercel Deployment

1. Create a Vercel account and connect your GitHub repository.
2. Add all required environment variables in the Vercel dashboard.
3. Deploy with the following settings:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`

## Troubleshooting

### Common Issues

- **Database Connection Errors**

  - Verify your DATABASE_URL in the .env file
  - Ensure the database server is running
  - Check network connectivity to the database

- **Authentication Issues**

  - Confirm NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly
  - Verify OAuth provider credentials if using social login

- **Image Upload Problems**

  - Check uploadthing credentials
  - Verify network connectivity
  - Ensure file size is within limits

- **Prisma Errors**
  - Run `pnpm prisma generate` after schema changes
  - Ensure migrations are applied with `pnpm prisma migrate dev`

### Getting Help

If you encounter issues not covered here, please:

1. Check existing GitHub issues
2. Create a new issue with detailed reproduction steps
3. Include error messages and environment information

## Contributing

I welcome contributions to improve Ali Reddit!

### Contributing Guidelines

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Ensure code quality**:
   ```bash
   pnpm lint
   pnpm format
   ```
5. **Write or update tests if applicable**
6. **Commit using conventional commits**:
   ```bash
   git commit -m "feat: add new feature"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a pull request**

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Comment complex logic
- Update documentation for significant changes

## License

This project is licensed under the MIT License - see the LICENSE file for
details.

```
MIT License

Copyright (c) 2023 Ali-Reddit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

```

```
