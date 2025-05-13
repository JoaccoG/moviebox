# 🎬 MovieBox
**Simple and elegant movie recommendations app built with TypeScript, React, Remix, and React Router. Discover movies, rate them, view it's details, add your favorites to a list and share your thoughts with comments.**

## 🎥 App Demo
MovieBox it's deployed on Netlify, and has integration with GitHub Actions.  
🔗 [To see a live demo of the app, simply click here.](https://joaccog-moviebox.netlify.app/)

## 📌 Main Features
✅ **Search:** Find your favorite movies.  
✅ **Comments:** Save comments in your local storage (*WIP: Backend migration*).  
✅ **Rating:** Rate the last movies you watched.  
✅ **Dynamic and responsive interface:** Mobile-first, half-designed with TailwindCSS.  
✅ **Modular architecture:** Reusable componentes, optimized for scalability.  

## 🛠️ Tech Stack
| Technology      | Purpose |
|---------------|-----------|
| **React** | Main framework |
| **React Router v7** | Routing and utilities |
| **TailwindCSS** | Responsive and modular design |
| **Vitest + React Testing Library** | Unit and integration testing |
| **LocalStorage** | Temporary comments storage |
| **Netlify** | Hosting |
| **GitHub Actions** | CI/CD |

## 📊 Quality Code Analysis
This project uses SonarCloud to evaluate code quality and test coverage.  
Here are some real-time metrics of the proejct:  
![SonarCloud](https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)  
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=coverage)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)  
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)  
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=bugs)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JoaccoG_moviebox&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=JoaccoG_moviebox)  
🔗 [Click here to see the full SonarCloud analysis](https://sonarcloud.io/project/overview?id=JoaccoG_moviebox)

## 🚀 Installation and Execution
### **1️⃣ Clone the repository**
```bash
git clone https://github.com/JoaccoG/moviebox.git
cd moviebox
```

### **2️⃣ Install dependencies**
> pnpm is recommended.
```bash
pnpm install
```

### **3️⃣ Run the app on development mode**
```bash
pnpm dev
```

### **4️⃣ Run tests**
```bash
pnpm test
```

## 📂 Folders Structure
```
📦 moviebox
 ┣ 📂 app
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 AddComment.tsx
 ┃ ┃ ┣ 📜 Comments.tsx
 ┃ ┃ ┣ 📜 CommentsList.tsx
 ┃ ┃ ┣ 📜 MovieCard.tsx
 ┃ ┃ ┣ 📜 MovieDetails.tsx
 ┃ ┃ ┣ 📜 MoviesList.tsx
 ┃ ┃ ┣ 📜 SearchBar.tsx
 ┃ ┣ 📂 contexts
 ┃ ┃ ┣ 📂 movies
 ┃ ┃ ┃ ┣ 📜 context.tsx
 ┃ ┃ ┃ ┣ 📜 provider.tsx
 ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📜 useDebounce.tsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 home.tsx
 ┃ ┃ ┣ 📜 details.tsx
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 home.tsx
 ┃ ┃ ┣ 📜 details.tsx
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📜 omdb-service.ts
 ┃ ┣ 📂 shared
 ┃ ┃ ┣ 📜 ErrorComponent.tsx
 ┃ ┃ ┣ 📜 Header.tsx
 ┃ ┃ ┣ 📜 Spinner.tsx
 ┃ ┣ 📂 types
 ┃ ┃ ┣ 📜 movies.ts
 ┃ ┃ ┣ 📜 comments.ts
 ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 tests.tsx
 ┃ ┗ 📜 root.tsx
 ┃ ┗ 📜 routes.ts
 ┗ 📁 // Other dirs and files...
```

---

> Check out my [Portfolio](https://www.joaquingodoy.com) &nbsp;&middot;&nbsp;
> See my projects on [GitHub](https://github.com/joaccog) &nbsp;&middot;&nbsp;
> Follow me on [Instagram](https://instagram.com/joaccog99)
