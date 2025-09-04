Okay, here is a revised version of your README file in a more standard and readable format, combining the content and making it clear that your project is the Civic Issue Certificate Generator, which feeds into a database using GitHub Issues.

---

# 🏛️ Civic Issue Certificate Generator & Database

A modern, citizen-focused web application that allows users to report local civic issues by generating a shareable "certificate." This project leverages photo metadata to automatically capture location and time, creating a powerful tool for civic awareness.

All generated reports are stored **for free** using GitHub Issues as a database, with automated analytics.

[![App Screenshot](./public/images/screenshot.png)](./public/images/screenshot.png)
*Note: Please replace `./public/images/screenshot.png` with an actual screenshot of your application.*

---

## ✨ Key Features

### Certificate Generator
*   **📸 Image-Based Reporting**: Upload a photo of a civic issue (like a pothole or garbage pile).
*   **📍 Automatic Data Extraction**: Reads EXIF data from photos to get the exact **GPS location** and **capture time**.
*   **📜 Dynamic Certificate Generation**: Creates a professional-looking, shareable certificate on an HTML canvas with all the issue details.
*   **✨ Glassmorphism UI**: A beautiful, modern "liquid glass" theme.
*   **👨‍💼 Leader/Official Photos**: Option to include photos of public officials (e.g., PM Modi, Nitin Gadkari) for awareness.
*   **🔗 Social Sharing**: Built-in functionality to share the generated certificate on social media.
*   **🌐 Multi-Language Support**: Easily adaptable for different languages.

### Free Database & Analytics
*   **📊 Unlimited Storage**: Uses GitHub Issues as a free, scalable database for reports.
*   **🤖 Automated Analytics**: GitHub Actions process data regularly.
*   **📈 Real-time Dashboard**: (Planned/Link to dashboard if available) View live statistics and insights.
*   **🏷️ Smart Categorization**: Automatic labeling of issues by type and location.
*   **🔍 Search & Filter**: Leverages GitHub's built-in search capabilities.
*   **💰 Zero Backend Cost**: Completely free infrastructure using GitHub.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/), Radix UI
*   **Package Manager**: [pnpm](https://pnpm.io/)
*   **Deployment**: [Vercel](https://vercel.com/)
*   **Database/Storage**: GitHub Issues
*   **Automation**: GitHub Actions

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)
*   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sharmaronit/civic_issues.git
    ```
2.  **Navigate to the project directory**
    ```bash
    cd civic_issues
    ```
3.  **Install dependencies**
    ```bash
    pnpm install
    ```
4.  **Set up environment variables**
    Create a new file named `.env.local` in the root of the project and add any necessary environment variables (refer to `.env.example` if it exists).
    ```bash
    cp .env.example .env.local # If .env.example exists
    # Then edit .env.local
    ```
5.  **Run the development server**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to your GitHub repository (e.g., `https://github.com/sharmaronit/civic_issues`).
2.  Connect your GitHub repository to your Vercel account.
3.  Follow the on-screen instructions to deploy.
4.  The application will be deployed automatically on every push to the `main` branch.

---

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Don't forget to give the project a star! Thanks again!

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## 📧 Contact

Ronit Sharma - [@sharmaronit](https://github.com/sharmaronit)

Project Link: [https://github.com/sharmaronit/civic_issues](https://github.com/sharmaronit/civic_issues)

---

**Made with ❤️ by [@geminiproronit](https://twitter.com/geminiproronit)**

---
