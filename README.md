# Personal Portfolio Website

A modern, interactive, and responsive personal portfolio website built with React, Vite, and Three.js. This project showcases skills, projects, experience, and certifications with engaging 3D visuals and smooth animations.

## 🚀 Features

- **Interactive 3D Elements**: Immersive backgrounds and skill visualizations using Three.js and React Three Fiber.
- **Smooth Animations**: Powered by Framer Motion for page transitions and scroll effects.
- **Responsive Design**: Fully optimized for all devices (Desktop, Tablet, Mobile).
- **Dynamic Content**: Easy-to-update content managed through structured data files.
- **Contact Form**: Integrated with EmailJS for direct messaging.
- **PDF Resume Viewer**: Built-in PDF viewer for showcasing resumes and certificates.
- **Theme Support**: Dark/Light mode support (if applicable) and consistent styling.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules, Global CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **PDF Rendering**: [React-PDF](https://github.com/wojtekmaj/react-pdf)
- **Email Service**: [EmailJS](https://www.emailjs.com/)

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Copy `.env.example` to `.env.local` and update the values.
    ```bash
    cp .env.example .env.local
    ```

### Running the Project

Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Create a production build:
```bash
npm run build
```
Preview the build:
```bash
npm run preview
```

## ⚙️ Configuration

### EmailJS Setup (Contact Form)

To make the contact form functional, you need to set up EmailJS:

1.  Create an account at [EmailJS](https://www.emailjs.com/).
2.  Create a new **Email Service** (e.g., Gmail).
3.  Create a **Email Template**.
4.  Get your **Service ID**, **Template ID**, and **Public Key**.
5.  Update your `.env.local` file:

    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

### Customizing Content

All content is managed in the `src/data` directory. You can easily update your information without touching the component code.

-   **`src/data/personal.js`**: Name, bio, contact details.
-   **`src/data/projects.js`**: List of projects with descriptions, links, and images.
-   **`src/data/skills.js`**: Technical skills categorized by type.
-   **`src/data/experience.js`**: Work experience history.
-   **`src/data/education.js`**: Education background.
-   **`src/data/certifications.js`**: Certificates and achievements.
-   **`src/data/social.js`**: Social media links.
-   **`src/data/titles.js`**: Hero section typing titles.

## 📂 Project Structure

```
src/
├── assets/         # Images and static assets
├── components/     # Reusable UI components (Navbar, Footer, 3D backgrounds)
├── context/        # React Context (Theme, etc.)
├── data/           # Content data files
├── pages/          # Main page components (Home, About, Projects, etc.)
├── styles/         # CSS files (Global and Component-specific)
├── utils/          # Helper functions
├── App.jsx         # Main App component
└── main.jsx        # Entry point
```

## 📄 License

This project is licensed under the MIT License.
