DDBlog
------

DDBlog is a blogging platform built using modern web technologies: Next.js, TypeScript, React, and Tailwind CSS. It allows users to create, edit, and publish blog posts with rich content, supporting categories and SEO-friendly URLs.

### Features

*   User authentication with NextAuth.js
*   Create, edit, and delete blog posts
*   Organize posts with categories (including assigning multiple)
*   Content editor with Markdown support
*   SEO-friendly URLs with automatic slug generation
*   Responsive design built with Tailwind CSS
*   RESTful API routes for managing blog content

### Getting Started

**Prerequisites**

*   Node.js (version 16 or later)
*   npm or yarn package manager
*   PostgreSQL database

**Installation**

1.  Clone the repository:
    
    Bash
    
        git clone https://github.com/LHai-dev/ddblog.git
        cd ddblog
        
    
    Use code [with caution.](/faq#coding)
    
2.  Install dependencies:
    
    Bash
    
        npm install # or yarn install
        
    
    Use code [with caution.](/faq#coding)
    
3.  Configure environment variables:
    
    Create a `.env.local` file at the project root and add the following, replacing placeholders with your details:
    
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/ddblog
        NEXTAUTH_URL=http://localhost:3000
        NEXTAUTH_SECRET=your-next-auth-secret
    
4.  Run database migrations:
    
    Bash
    
        npx prisma migrate dev --name init
        
    
    Use code [with caution.](/faq#coding)
    
5.  Start the development server:
    
    Bash
    
        npm run dev # or yarn dev
        
    
    Use code [with caution.](/faq#coding)
    
    Your application should now be accessible at http://localhost:3000.
    

### API Routes

*   `/api/blogs`: Retrieves all blog posts
*   `/api/blogs` (POST): Creates a new blog post
*   `/api/categories`: Retrieves all categories
*   `/api/categories` (POST): Creates a new category

### Running Tests

Bash

    npm run test # or yarn test
    

Use code [with caution.](/faq#coding)

### Linting

Bash

    npm run lint # or yarn lint
    

Use code [with caution.](/faq#coding)

### Deployment

For production builds:

Bash

    npm run build # or yarn build
    

Use code [with caution.](/faq#coding)

Then, start the production server:

Bash

    npm start # or yarn start
    

Use code [with caution.](/faq#coding)

### Technologies Used

*   Next.js: Framework for building server-side rendered React applications
*   TypeScript: Typed JavaScript superset for improved code quality
*   Tailwind CSS: Utility-first CSS framework for rapid UI development
*   NextAuth.js: Authentication solution for Next.js applications
*   Prisma: Object-Relational Mapper (ORM) for managing PostgreSQL databases

### Contributing

We welcome contributions! Here's how to get involved:

1.  Fork the repository.
2.  Create a new branch for your changes (e.g., `git checkout -b feature/your-feature-name`).
3.  Implement your changes and commit them (e.g., `git commit -m "Add some feature"`).
4.  Push your branch to your fork (e.g., `git push origin feature/your-feature-name`).
5.  Create a pull request from your fork.

### License

This project is licensed under the MIT License.

**Note:**

*   Removed unnecessary code blocks and comments
*   Consolidated information for better readability
*   Added missing details about environment variables

**Additional Tips:**

*   You can add screenshots showcasing the application.
*   Consider including a link to a live demo if available.
