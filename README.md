<<<<<<< HEAD
# Civic Issue Certificate Generator

A modern, citizen-focused web application that allows users to report local civic issues by generating a shareable "certificate." This project leverages photo metadata to automatically capture location and time, creating a powerful tool for civic awareness.

![App Screenshot](./public/images/screenshot.png)
*<p align="center">Note: Please replace this with a screenshot of your finished application!</p>*

---

## ✨ Key Features

- **Image-Based Reporting**: Upload a photo of a civic issue (like a pothole or garbage pile).
- **Automatic Data Extraction**: Automatically reads EXIF data from photos to get the exact **GPS location** and **capture time**.
- **Dynamic Certificate Generation**: Creates a professional-looking, shareable certificate on an HTML canvas with all the issue details.
- **Glassmorphism UI**: A beautiful, modern "liquid glass" theme inspired by the latest design trends.
- **Leader/Official Photos**: Option to include photos of public officials to tag them for awareness.
- **Social Sharing**: Built-in functionality to share the generated certificate on social media.
- **Multi-Language Support**: Easily adaptable for different languages.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/), Radix UI
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/sharmaronit/civic_issues.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd civic_issues
    ```
3.  **Install dependencies**
    ```sh
    pnpm install
    ```
4.  **Set up environment variables**
    Create a new file named `.env.local` in the root of the project and add any necessary environment variables.
    ```sh
    cp .env.example .env.local
    ```
5.  **Run the development server**
    ```sh
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to your Vercel account and follow the on-screen instructions. The application will be deployed automatically on every push to the `main` branch.

---

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

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
=======
# 🏛️ Civic Issues Database

A **free, unlimited database** for civic issues using GitHub Issues with automated analytics and community insights.

## 🎯 What This Is

This repository serves as a **centralized database** for all civic issue reports from (https://civic.issues). Instead of expensive backend infrastructure, we use **GitHub Issues as a free database** with automated analytics processing.

## 🚀 Features

- **📊 Unlimited Storage** - Store millions of civic reports for free
- **🤖 Automated Analytics** - GitHub Actions process data every 6 hours
- **📈 Real-time Dashboard** - Live statistics and insights
- **🏷️ Smart Categorization** - Automatic labeling by issue type and location
- **🔍 Search & Filter** - Built-in GitHub search capabilities
- **📱 Community Insights** - Track trends and hotspots
- **💰 Zero Cost** - Completely free forever!

## 🏗️ How It Works

### Data Flow
```
User generates certificate → GitHub Issues API → Issue created → Analytics processed → Dashboard updated
```

### Storage Structure
Each civic report becomes a GitHub issue with:
- **Title**: Issue type + location
- **Body**: Structured data (type, location, date, notes, etc.)
- **Labels**: Categorization (issue-type, location, year, etc.)
- **State**: Open (active) or Closed (resolved)

## 📊 Analytics Dashboard

The system automatically generates:
- **Total reports count**
- **Issue type distribution**
- **Geographic hotspots**
- **User activity tracking**
- **Daily activity trends**
- **Top contributors**

## 🛠️ Technical Stack

- **Database**: GitHub Issues (unlimited, free)
- **Automation**: GitHub Actions (2,000 free minutes/month)
- **Processing**: Node.js scripts
- **Analytics**: JSON data files
- **Frontend**: React dashboard component

## 🚀 Getting Started

### For Users
1. **Visit [reportcard.fun](https://civic.issues)**
2. **Report a civic issue** (pothole, garbage, etc.)
3. **Generate certificate** with photo and location
4. **Your report is automatically stored** in this database
5. **View community analytics** and insights

### For Developers
1. **Clone this repository**
2. **Install dependencies**: `npm install`
3. **Run analytics**: `npm run analytics`
4. **View generated data** in `analytics/` folder

## 📁 Repository Structure

```
civic-issues-database/
├── .github/
│   └── workflows/
│       └── analytics.yml          # Automated analytics
├── scripts/
│   ├── analytics.js               # Data processing
│   ├── create-summary.js          # Summary generation
│   └── comment-analytics.js       # Issue comments
├── analytics/                     # Generated analytics files
│   ├── summary.json
│   ├── issue-types.json
│   ├── locations.json
│   └── daily-activity.json
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔧 Automation

### GitHub Actions Workflow
- **Triggers**: Every 6 hours, on issue events
- **Processes**: All civic reports
- **Generates**: Analytics and summaries
- **Updates**: Dashboard data automatically

### Analytics Generation
- **Frequency**: Every 6 hours
- **Data**: All issues in repository
- **Output**: JSON files + Markdown summary
- **Storage**: Committed to repository

## 📈 Scaling

### Current Limits
- **GitHub Issues**: Unlimited
- **GitHub Actions**: 2,000 minutes/month (free)
- **Repository size**: 1GB (sufficient for metadata)
- **API rate limits**: 5,000 requests/hour

### Future Scaling
- **Multiple repositories** for different regions
- **Advanced analytics** with external tools
- **Real-time processing** with webhooks
- **Machine learning** insights

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues**: Use GitHub Issues for bugs or feature requests
2. **Submit Pull Requests**: Improve the analytics or automation
3. **Share Ideas**: Suggest new features or improvements
4. **Spread the Word**: Tell others about this free civic tech solution

## 🔒 Privacy & Security

- **No personal information** stored
- **Anonymous user IDs** only
- **Public repository** for transparency
- **Community-driven** data sharing
- **Read-only access** for public data

## 📞 Support

- **GitHub Issues**: Use this repository for questions
- **Documentation**: Check the [setup guide](GITHUB_SETUP.md)
- **Community**: Engage with civic tech community
- **Contributions**: Welcome pull requests and improvements

## 🎉 Benefits

### For Citizens
- **Transparent data storage**
- **Community insights**
- **Issue tracking**
- **Impact measurement**

### For Government
- **Data-driven decision making**
- **Resource allocation**
- **Accountability tracking**
- **Policy influence**

### For Community
- **Data-driven advocacy**
- **Government accountability**
- **Resource allocation**
- **Policy influence**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub** for providing free unlimited storage
- **GitHub Actions** for free automation
- **Community** for contributing reports and insights
- **Open source** community for inspiration

---

**This system gives you enterprise-level analytics capabilities at $0/month cost!** 🎯

*Made with ❤️ by [@geminiproronit](https://twitter.com/geminiproronit)*

---

**🔗 Links:**
- 🌐 [Live App](https://civic.issues)
#   c i v i c _ i s s u e s  
 