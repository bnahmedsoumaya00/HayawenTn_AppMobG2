# 🐾 HayawenTn

**Mobile E-Commerce Platform for Pets in Tunisia**

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

**🎓 Integration Project - License in Multimedia and Web Development**  
*Higher Institute of Technological Studies of Kelibia (ISET Kelibia)*

**حيوان تونس - Animal Tunisia**

---

## 📖 About The Project

**HayawenTn** (حيوان تونس - "Animal Tunisia") is a comprehensive cross-platform mobile e-commerce application that bridges the gap between pet owners, sellers, and veterinary services across Tunisia.

### 🎯 Project Context

This application represents our **Final Year Integration Project** for academic year **2025/2026**, developed as part of the **License in Multimedia and Web Development** program at **ISET Kelibia**, Tunisia.

### 🏆 Project Goals

Create a unified, secure, and user-friendly mobile platform that revolutionizes pet care services accessibility in Tunisia.

### 🤔 The Problem

- **🏪 Limited Access**: Specialized pet stores are scarce and concentrated only in major cities
- **📊 Fragmented Info**: Veterinary services information is scattered and difficult to find
- **🔍 No Platform**: Lack of secure, transparent marketplace for pet adoption and sales
- **⚠️ Trust Issues**: No centralized system to verify sellers or services

### ✨ Our Solution

| Feature | Description | Benefit |
|---------|-------------|---------|
| 🛒 **Product Marketplace** | Browse and search pet products by category | Easy access to pet supplies |
| 🏥 **Vet Directory** | Find qualified veterinarians filtered by specialty | Quick healthcare access |
| 📢 **Announcements** | Post and browse pet sale/adoption listings with photos | Transparent pet marketplace |
| ⭐ **Favorites System** | Save and manage preferred announcements | Personalized experience |
| 🔐 **Secure Platform** | JWT authentication and encrypted data storage | Safe transactions |

---

## 🚀 Key Features

### 🐕 For Pet Owners

- ✓ **Browse pet products**: Search functionality and category filters
- ✓ **Find veterinarians**: Filter by specialty (dogs, cats, birds, exotic)
- ✓ **Adoption & sales**: View announcements and save favorites
- ✓ **Direct contact**: Reach sellers and contact vets

### 🏪 For Sellers & Breeders

- ✓ **Create announcements**: Detailed descriptions with up to 5 photos
- ✓ **Manage listings**: Edit anytime or delete when sold
- ✓ **Reach audience**: Connect with targeted pet owners
- ✓ **Build reputation**: Increase platform visibility

### 🏥 For Veterinarians

- ✓ **Professional listing**: Directory presence with clinic details
- ✓ **Showcase expertise**: Display specialties and contact information
- ✓ **Digital presence**: Increase visibility and accessibility
- ✓ **Client reach**: Connect with pet owners and build clientele

---

## 🛠️ Tech Stack

### 📱 Frontend Architecture

**Core Technologies:**
```
React Native + Expo
├── React Navigation 6.x
├── Axios
├── React Hooks (useState, useEffect, useContext)
└── Expo ImagePicker
```

**Key Features:**
- ⚡ Cross-platform (iOS & Android)
- 🎨 Custom UI components
- 🔄 Real-time state management
- 📸 Multi-image upload support
- 🚀 Hot reloading with Expo

### 🔧 Backend Architecture

**Core Technologies:**
```
Node.js + Express.js
├── JWT Authentication
├── Multer File Upload
├── Input Validation
├── Error Handling
└── MySQL Database
```

**Database Features:**
- Prepared Statements
- Foreign Key Constraints
- Indexed Columns
- Transaction Support

**Security Features:**
- 🛡️ SQL injection prevention
- 🔗 Data integrity constraints
- ⚡ Query optimization
- 🔄 ACID compliance

### 🔨 Development Tools

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MOBILE APPLICATION                       │
│                   (React Native + Expo)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Auth    │  │ Products │  │Announces │  │   Vets   │   │
│  │ Screens  │  │ Screens  │  │ Screens  │  │ Screens  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP/HTTPS (Axios)
                            │
┌─────────────────────────────────────────────────────────────┐
│                    REST API (Express.js)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes → Controllers → Models → Database           │  │
│  │  🔒 Middleware: Auth, Upload, Validation, Errors   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                    SQL Queries (Prepared)
                            │
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL 8.0)                      │
│  ┌──────┐  ┌────────┐  ┌──────────┐  ┌────────────────┐  │
│  │Users │  │Products│  │Announces │  │Veterinarians   │  │
│  └───┬──┘  └────────┘  └─────┬────┘  └────────────────┘  │
│      └──────────┬─────────────┘                            │
│                 │                                           │
│            ┌────▼─────┐                                     │
│            │Favorites │                                     │
│            └──────────┘                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Installation & Setup

### Prerequisites

- **Node.js** v14 or higher
- **MySQL** v8.0 or higher
- **Expo CLI** (latest version)
- **Git** for version control

---

### 1️⃣ Clone Repository

```bash
# Clone the project
git clone https://github.com/bnahmedsoumaya00/HayawenTn_AppMobG2.git

# Navigate to project directory
cd HayawenTn_AppMobG2
```

---

### 2️⃣ Backend Setup

#### 📦 Install Dependencies

```bash
# Navigate to backend folder
cd hayawenTn-backend

# Install all dependencies
npm install
```

#### ⚙️ Configure Environment

Create a `.env` file in the backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hayawentn_db
JWT_SECRET=your_secure_jwt_secret
```

#### 💾 Setup Database

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE hayawentn_db;
USE hayawentn_db;

-- Import schema (if available)
SOURCE database_schema.sql;

-- Exit MySQL
EXIT;
```

#### 🚀 Start Backend Server

```bash
npm start
```

**✅ Backend running at:** `http://localhost:5000`

---

### 3️⃣ Frontend Setup

<table>
<tr>
<td width="50%">

#### 📦 Install Dependencies

```bash
# Navigate to frontend folder
cd hayawenTn-mobile

# Install all dependencies
npm install
```

</td>
<td width="50%">

#### ⚙️ Configure API

```javascript
// Edit src/config/api.js
const API_BASE_URL = 'http://YOUR_IP:5000/api';
```
npm start
```

Backend runs on:  `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Update API URL in config file
# Edit src/config/api.js and set: 
# API_BASE_URL = 'http://YOUR_IP:5000/api'

# Start Expo
npx expo start

# Scan QR code with Expo Go app (Android/iOS)
# Or press 'a' for Android emulator / 'i' for iOS simulator
```
---

## 🎨 Design & User Experience

### Design Process
1. **Research**:  Analyzed existing pet platforms and user needs
2. **Wireframing**: Created low-fidelity sketches
3. **Prototyping**:  Designed high-fidelity mockups in Figma
4. **User Testing**: Gathered feedback and iterated

### UI/UX Principles Applied
- ✨ **Clean & Intuitive**: Simple navigation, max 3 taps to any feature
- 📱 **Mobile-First**:  Optimized for smartphone screens (5-7 inches)
- 🎨 **Consistent Design**: Unified color scheme and typography
- ⚡ **Performance**: Fast loading times (<3s), smooth animations
- ♿ **Accessible**: Readable fonts (14px+), good color contrast

---

## 🔐 Security Features

| Feature | Implementation |
|---------|----------------|
| **Password Security** | bcrypt hashing with 10 salt rounds |
| **Authentication** | JWT tokens with 7-day expiration |
| **SQL Injection Prevention** | Prepared statements for all queries |
| **Input Validation** | express-validator on all endpoints |
| **File Upload Security** | MIME type validation, 5MB size limit |
| **Access Control** | Users can only modify their own content |
| **Data Encryption** | HTTPS in production environment |

---

## 🎓 Skills Gained & Experience

### Technical Skills Developed

#### Frontend Development (Tasnime Ben Salah)
- ✅ **React Native MasterConsuming REST APIs with Axios, handling async operations
- ✅ **Image Handling**: Implementing photo upload with Expo ImagePicker
- ✅ **Form Validation**: y**: Building cross-platform mobile apps with Expo
- ✅ **Component Architecture**: Creating reusable, maintainable UI components
- ✅ **State Management**: Using React Hooks effectively
- ✅ **Navigation**: Implementing complex navigation flows with React Navigation
- ✅ **API Integration**: Client-side input validation and error handling
- ✅ **Responsive Design**: Adapting UI for different screen sizes
- ✅ **Performance Optimization**: Lazy loading, memoization, and optimization techniques

#### Backend Development (Soumaya Ben Ahmed)
- ✅ **Node.js & Express**: Building scalable REST APIs
- ✅ **Database Design**: Creating normalized MySQL schemas with relationships
- ✅ **Authentication**: Implementing JWT-based secure authentication
- ✅ **File Upload**: Handling multipart/form-data with Multer
- ✅ **SQL Queries**: Writing complex queries with joins and prepared statements
- ✅ **Error Handling**: Implementing comprehensive error middleware
- ✅ **Security**: Preventing SQL injection, XSS, and other vulnerabilities
- ✅ **API Documentation**: Creating clear, maintainable API endpoints

#### Soft Skills & Collaboration
- 🤝 **Teamwork**: Effective collaboration between frontend and backend developers
- 📞 **Communication**: Regular meetings, clear documentation, and progress updates
- 🐛 **Problem Solving**: Debugging complex issues across the full stack
- 📚 **Self-Learning**: Researching documentation, tutorials, and community solutions
- 🔄 **Adaptability**: Pivoting from Firebase to MySQL based on project needs

#### Professional Skills
- 📝 **Technical Documentation**: Writing clear README, API docs, and code comments
- 🎨 **UI/UX Design**: Collaborative design process using Figma
- ⏰ **Time Management**: Meeting deadlines while maintaining code quality
- 🎤 **Presentation**: Preparing project demonstrations and defending technical choices

---

## 📈 Project Workflow

### Development Methodology: Agile Scrum

```
Sprint 1 (Weeks 1-2): Planning & Setup
├── Project requirements analysis
├── Database schema design
├── Technology stack selection
├── Development environment setup
└── UI/UX wireframes in Figma

Sprint 2 (Weeks 3-4): Core Features
├── Backend: Auth system, Products API
├── Frontend: Login/Register, Products screens
├── Database: Users and Products tables
└── Integration testing

Sprint 3 (Weeks 5-6): Advanced Features
├── Backend: Announcements API, Veterinarians API
├── Frontend: Announcements CRUD, Vets directory
├── Image upload implementation
└── End-to-end testing

Sprint 4 (Weeks 7-8): Polish & Deploy
├── Backend: Favorites system
├── Frontend: Favorites screen
├── Integration testing
├── Bug fixes and optimization
├── Documentation
└── Final presentation preparation
```


## 🏆 Achievements & Challenges

### Key Achievements
- ✅ Delivered a fully functional cross-platform mobile application
- ✅ Successfully integrated complex features (auth, file upload, favorites)
- ✅ Implemented secure backend with industry-standard practices
- ✅ Created intuitive, user-friendly interface design
- ✅ Completed project on time with all MVP features
- ✅ Gained practical experience in full-stack mobile development

### Challenges Overcome

| Challenge | Solution |
|-----------|----------|
| **Firebase to MySQL Migration** | Redesigned entire database schema, rewrote backend queries, learned SQL optimization |
| **Image Upload Complexity** | Implemented Multer with proper file validation, storage organization, and error handling |
| **JWT Authentication** | Studied authentication best practices, implemented secure token generation and validation |
| **Cross-Platform Consistency** | Tested extensively on Android/iOS, adjusted styling for platform-specific differences |
| **Team Coordination** | Established clear communication channels, regular meetings, and Git workflow |
| **Performance Optimization** | Added database indexes, optimized queries, implemented lazy loading on frontend |

---

## 📸 Screenshots

### Mobile Application Screens
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Login     │  Products   │ Announce-   │    Vets     │
│   Screen    │   List      │  ments      │   List      │
│             │             │             │             │
│  [Email]    │ 🔍 Search   │ 📢 Create   │ 🏥 Filter   │
│  [Pass]     │ 🏷️ Filter   │ 📋 Browse   │ 📞 Contact  │
│  [Login]    │ 🛒 Browse   │ ⭐ Favorite │ 🗺️ Details  │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

*Note: Actual screenshots can be added by placing images in `/docs/screenshots/` folder*

---

## 🎯 Future Enhancements

### Phase 2 Roadmap
- 💳 **Payment Integration**: Secure online payments for product purchases
- 🔔 **Push Notifications**: Alert users about new announcements or messages
- 💬 **In-App Chat**: Direct messaging between buyers and sellers
- 📍 **Geolocation**: Map view of nearby vets and pet stores
- ⭐ **Rating System**: User reviews for products, sellers, and vets
- 🌐 **Web Version**: Responsive web application for desktop access
- 🇹🇳 **Arabic Support**: Bilingual interface (French/Arabic)
- 📊 **Analytics Dashboard**: Seller insights and platform statistics

---

## 👥 Team

<eam

<table>
  <tr>
**Soumaya Ben Ahmed** - Backend Developer
- 🔧 Database Design & Architecture
- 🚀 REST API Development
- 🔐 Security Implementation
- 📊 Data Modeling
- GitHub: [@bnahmedsoumaya00](https://github.com/bnahmedsoumaya00)

**Tasnime Ben Salah** - Frontend Developer
- 🎨 UI/UX Design
- 📱 Mobile Development
- ⚛️ React Native Implementation
- 🎯 User Experience Optimization

### 👩‍🏫 Academic Supervision

**Professor Houda Toukabri**  
Project Supervisor  
Higher Institute of Technological Studies of Kelibia (ISET Kelibia)

<p>For Contact

For inquiries, collaboration, or feedback, feel free to reach out!

- **GitHub**: [@bnahmedsoumaya00](https://github.com/bnahmedsoumaya00)
- **LinkedIn**: [Connect with us](https://www.linkedin.com/in/soumayabenahmed/)
- **Email**: soumaya.ben.ahmed.009@gmail.com
- **Repository**: [HayawenTn_AppMobG2](https://github.com/bnahmedsoumaya00/HayawenTn_AppMobG2)

---

### ⭐ Star this repository if you find it interesting!

![GitHub stars](https://img.shields.io/github/stars/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social)
![GitHub forks](https://img.shields.io/github/forks/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social)

**🇹🇳 Built with dedication and passion for pet welfare in Tunisia 🐾**

*From concept to deployment - A complete full-stack mobile development journey*

![ISET Kelibia](https://img.shields.io/badge/ISET_Kelibia-Education-blue?style=for-the-badge)
![Academic Year](https://img.shields.io/badge/Academic_Year-2024/2025-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-Multimedia_&_Web_Dev-orange?style=for-the-badge)

---

**Made with ❤️ by Soumaya Ben Ahmed & Tasnime Ben Salah**  
© 2025 HayawenTn. All Rights Reserved.

## 🏆 Achievements & Challenges

### � Academic Information

**Institution**: Higher Institute of Technological Studies of Kelibia (ISET Kelibia)  
**Department**: Information Technology  
**Program**: License in Multimedia and Web Development  
**Project Type**: Final Year Integration Project 
**Academic Year**: 2024/2025  
**Group**: AppMob_G2  
**Location**: Kelibia, Tunisia 🇹🇳

---

## 📄 Project Documentation

Complete project documentation is available in the `/docs` folder:
- 📋 **Cahier de Charge** (Specifications Document)
- 📊 **Technical Report** (Detailed implementation report)
- 🎨 **Figma Design Files** (UI/UX mockups)
- 📐 **UML Diagrams** (Use case, sequence, class diagrams)

---

## 🙏 Acknowledgments

We would like to express our gratitude to:

- 👩‍🏫 **Professor Houda Toukabri**: For her guidance, support, and valuable feedback throughout the project
- 🏫 **ISET Kelibia**: For providing the educational framework and resources
- 👨‍👩‍👧‍👦 **Our Families**: For their unwavering support and encouragement
- 🐾 **Pet Owner Community**: For inspiring this solution and providing insights
- 💻 **Open Source Community**: For the excellent tools and libraries that made this project possible
