```markdown
# HayawenTn 🐾 - Mobile E-Commerce Platform for Pets

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

**A comprehensive mobile solution for pet owners in Tunisia**

*Integration Project - License in Multimedia and Web Development*  
*Higher Institute of Technological Studies of Kelibia (ISET Kelibia)*

[About](#about) • [Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Team](#team)

</div>

---

## 📖 About The Project

**HayawenTn** (حيوانات تونس - meaning "Animals of Tunisia") is a cross-platform mobile e-commerce application designed to connect pet owners, sellers, and veterinary services across Tunisia. The platform provides a centralized ecosystem where users can purchase pet products, find qualified veterinarians, and browse or post pet adoption and sale announcements.

### 🎯 Project Context

This application was developed as our **Final Year Integration Project (PFE)** for the academic year **2024/2025** as part of the **License in Multimedia and Web Development** program at **ISET Kelibia**, Tunisia. 

### 🤔 The Problem

Pet owners in Tunisia face several challenges:
- **Limited Access**:  Specialized pet stores are scarce and concentrated in major cities
- **Fragmented Information**: Veterinary services information is scattered and hard to find
- **No Unified Platform**: Lack of secure, transparent marketplace for pet adoption and sales
- **Trust Issues**: No centralized system to verify sellers or services

### ✨ Our Solution

HayawenTn addresses these challenges by providing:
- 🛒 **Product Marketplace**: Browse and search pet products by category
- 🏥 **Vet Directory**: Find qualified veterinarians filtered by specialty
- 📢 **Announcements**: Post and browse pet sale/adoption listings with photos
- ⭐ **Favorites System**: Save and manage preferred announcements
- 🔐 **Secure Platform**: JWT authentication and encrypted data storage

---

## 🚀 Key Features

### For Pet Owners
- Browse pet products with search and category filters
- Find veterinarians by specialty (dogs, cats, birds, exotic pets)
- View adoption and sale announcements
- Save favorite announcements for later
- Contact sellers and vets directly

### For Sellers & Breeders
- Create detailed sale/adoption announcements
- Upload up to 5 photos per announcement
- Edit and manage your listings
- Reach targeted audience of pet owners

### For Veterinarians
- Professional directory listing
- Display specialties and contact information
- Increase digital presence and accessibility

---

## 🛠️ Tech Stack

### Frontend (Mobile Application)
```javascript
- React Native + Expo          // Cross-platform mobile framework
- React Navigation             // Screen navigation
- Axios                        // HTTP client for API calls
- React Hooks                  // State management (useState, useEffect, useContext)
- Expo ImagePicker            // Photo selection and upload
```

### Backend (REST API)
```javascript
- Node.js + Express           // Server and API framework
- JWT (jsonwebtoken)          // Authentication tokens
- bcrypt                      // Password hashing
- Multer                      // File upload middleware
- express-validator           // Input validation
- CORS                        // Cross-origin resource sharing
```

### Database
```sql
- MySQL 8.0                   // Relational database management
- Prepared Statements         // SQL injection prevention
- Foreign Key Constraints     // Data integrity
- Indexed Columns             // Query optimization
```

### Development Tools
- **Design**: Figma (UI/UX prototyping)
- **IDE**: Visual Studio Code
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Database Management**: MySQL Workbench
- **Collaboration**: Discord, GitHub Projects

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
│                    REST API (Express. js)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes → Controllers → Models → MySQL Database      │  │
│  │  • JWT Authentication Middleware                      │  │
│  │  • Multer File Upload Middleware                      │  │
│  │  • Input Validation Middleware                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                    SQL Queries (Prepared)
                            │
┌─────────────────────────────────────────────────────────────┐
│                      MySQL DATABASE                          │
│  ┌───────┐  ┌─────────┐  ┌──────────────┐  ┌──────────┐   │
│  │ Users │  │Products │  │Announcements │  │   Vets   │   │
│  └───────┘  └─────────┘  └──────────────┘  └──────────┘   │
│       └──────────┬───────────────┘                          │
│              ┌────────┐                                      │
│              │Favorites│                                     │
│              └────────┘                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Installation & Setup

### Prerequisites
- Node. js (v14+)
- MySQL (v8.0+)
- Expo CLI (`npm install -g expo-cli`)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/bnahmedsoumaya00/HayawenTn_AppMobG2.git
cd HayawenTn_AppMobG2
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hayawentn_db
JWT_SECRET=your_secure_jwt_secret
EOF

# Create MySQL database
mysql -u root -p
CREATE DATABASE hayawentn_db;
USE hayawentn_db;
SOURCE database_schema.sql;  # If schema file exists
EXIT;

# Start backend server
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

## 📊 Database Schema

```sql
-- Users: Store registered user accounts
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    profile_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products: Pet products catalog
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(100),
    image_url VARCHAR(255),
    available BOOLEAN DEFAULT TRUE
);

-- Announcements: Pet sale/adoption posts
CREATE TABLE announcements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('sale', 'adoption'),
    animal_type VARCHAR(100),
    breed VARCHAR(100),
    age INT,
    description TEXT,
    price DECIMAL(10,2),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Announcement Images: Support multiple photos per announcement
CREATE TABLE announcement_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    announcement_id INT,
    image_url VARCHAR(255),
    display_order INT,
    FOREIGN KEY (announcement_id) REFERENCES announcements(id) ON DELETE CASCADE
);

-- Veterinarians: Vet directory
CREATE TABLE veterinarians (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    specialty VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100)
);

-- Favorites: User saved announcements
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    announcement_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (announcement_id) REFERENCES announcements(id) ON DELETE CASCADE,
    UNIQUE(user_id, announcement_id)
);
```

---

## 🔌 API Endpoints

### Authentication
```http
POST   /api/users/register     # Create new account
POST   /api/users/login        # Login and get JWT token
GET    /api/users/profile      # Get user profile (protected)
PUT    /api/users/profile      # Update profile (protected)
```

### Products
```http
GET    /api/products           # Get all products (query: ? category=food&search=dog)
GET    /api/products/:id       # Get product details
```

### Announcements
```http
GET    /api/announcements                # Get all announcements (query: ?type=sale&animal_type=dog)
GET    /api/announcements/:id            # Get announcement details
POST   /api/announcements                # Create announcement (protected)
PUT    /api/announcements/:id            # Update announcement (protected, owner only)
DELETE /api/announcements/:id            # Delete announcement (protected, owner only)
```

### Veterinarians
```http
GET    /api/veterinarians      # Get all vets (query: ?specialty=dogs&city=Tunis)
GET    /api/veterinarians/:id  # Get vet details
```

### Favorites
```http
GET    /api/favorites          # Get user favorites (protected)
POST   /api/favorites          # Add to favorites (protected)
DELETE /api/favorites/:id      # Remove from favorites (protected)
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
- ✅ **React Native Mastery**: Building cross-platform mobile apps with Expo
- ✅ **Component Architecture**: Creating reusable, maintainable UI components
- ✅ **State Management**: Using React Hooks effectively (useState, useEffect, useContext)
- ✅ **Navigation**: Implementing complex navigation flows with React Navigation
- ✅ **API Integration**:  Consuming REST APIs with Axios, handling async operations
- ✅ **Image Handling**: Implementing photo upload with Expo ImagePicker
- ✅ **Form Validation**: Client-side input validation and error handling
- ✅ **Responsive Design**: Adapting UI for different screen sizes
- ✅ **Performance Optimization**:  Lazy loading, memoization, and optimization techniques

#### Backend Development (Soumaya Ben Ahmed)
- ✅ **Node.js & Express**: Building scalable REST APIs
- ✅ **Database Design**: Creating normalized MySQL schemas with relationships
- ✅ **Authentication**: Implementing JWT-based secure authentication
- ✅ **Security Best Practices**: Password hashing, SQL injection prevention, input validation
- ✅ **File Storage**: Managing file uploads with Multer middleware
- ✅ **API Design**: RESTful principles, proper HTTP methods and status codes
- ✅ **Middleware Development**: Creating custom Express middleware
- ✅ **Error Handling**: Centralized error management and logging
- ✅ **Query Optimization**: Writing efficient SQL queries with indexes

### Soft Skills & Professional Development

#### Teamwork & Collaboration
- 🤝 **Pair Programming**: Regular code reviews and knowledge sharing
- 📅 **Project Management**: Agile methodology with sprints and daily standups
- 💬 **Communication**: Clear documentation, commit messages, and team discussions
- 🎯 **Task Distribution**: Efficient workload division based on strengths

#### Problem-Solving
- 🔍 **Debugging**: Systematic approach to identifying and fixing bugs
- 🧠 **Critical Thinking**: Analyzing requirements and proposing solutions
- 📚 **Research Skills**: Finding documentation, tutorials, and community solutions
- 🔄 **Adaptability**: Pivoting from Firebase to MySQL based on project needs

#### Professional Skills
- 📝 **Technical Documentation**: Writing clear README, API docs, and code comments
- 🎨 **UI/UX Design**:  Collaborative design process using Figma
- ⏰ **Time Management**: Meeting deadlines while maintaining code quality
- 🎤 **Presentation**:  Preparing project demonstrations and defending technical choices

---

## 📈 Project Workflow

### Development Methodology:  Agile Scrum

```
Sprint 1 (Weeks 1-2): Planning & Design
├── Requirements gathering and analysis
├── Database schema design
├── UI/UX design in Figma
└── Project setup and Git repository

Sprint 2 (Weeks 3-4): Core Features
├── Backend:  Authentication API (register/login)
├── Frontend: Auth screens and navigation
├── Backend: Products CRUD operations
└── Frontend: Product listing and details

Sprint 3 (Weeks 5-6): Advanced Features
├── Backend: Announcements with image upload
├── Frontend: Create/edit announcement screens
├── Backend:  Veterinarians directory
└── Frontend: Vet listing and search

Sprint 4 (Weeks 7-8): Polish & Deploy
├── Backend: Favorites system
├── Frontend: Favorites screen
├── Integration testing
├── Bug fixes and optimization
├── Documentation
└── Final presentation preparation
```

### Version Control Strategy
- **Main Branch**: Production-ready code
- **Dev Branch**: Integration branch for features
- **Feature Branches**: Individual features (`feature/auth`, `feature/announcements`)
- **Commit Convention**: Clear, descriptive messages (`feat: `, `fix:`, `docs:`)

### Daily Workflow
1. ☀️ **Morning Standup**:  Discuss progress, blockers, and daily goals
2. 💻 **Development**: Focused coding sessions with regular commits
3. 🔄 **Code Review**: Peer review of pull requests before merging
4. 🧪 **Testing**: Manual testing on emulator and physical devices
5. 📊 **Evening Sync**: Update project board and plan next day

---

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
- 🌐 **Web Version**:  Responsive web application for desktop access
- 🇹🇳 **Arabic Support**: Bilingual interface (French/Arabic)
- 📊 **Analytics Dashboard**:  Seller insights and platform statistics

---

## 👥 Team

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/bnahmedsoumaya00.png" width="150px;" alt="Soumaya Ben Ahmed" style="border-radius: 50%;"/><br />
      <sub><b>Soumaya Ben Ahmed</b></sub><br />
      <sub>Backend Developer</sub><br />
      <sub>Database Design & API Development</sub><br />
      <a href="https://github.com/bnahmedsoumaya00">GitHub</a>
    </td>
    <td align="center" width="50%">
      <sub><b>Tasnime Ben Salah</b></sub><br />
      <sub>Frontend Developer</sub><br />
      <sub>UI/UX Design & Mobile Development</sub><br />
    </td>
  </tr>
</table>

### Supervision
**Professor Houda Toukabri**  
Project Supervisor - ISET Kelibia

---

## 🎓 Academic Information

**Institution**: Higher Institute of Technological Studies of Kelibia (ISET Kelibia)  
**Department**: Information Technology  
**Program**: License in Multimedia and Web Development  
**Project Type**: Final Year Integration Project (PFE - Projet de Fin d'Études)  
**Academic Year**: 2024/2025  
**Group**: AppMob_G3  
**Location**: Kelibia, Tunisia 🇹🇳

---

## 📄 Project Documentation

Complete project documentation is available in the `/docs` folder:
- 📋 **Cahier de Charge** (Specifications Document)
- 📊 **Technical Report** (Detailed implementation report)
- 🎨 **Figma Design Files** (UI/UX mockups)
- 📐 **UML Diagrams** (Use case, sequence, class diagrams)

---

## 📜 Copyright & License

**© 2025 Soumaya Ben Ahmed & Tasnime Ben Salah.  All Rights Reserved.**

This project is an original creation developed as an academic integration project.  The concept, design, and implementation are the intellectual property of the authors.

**For Educational Use**:  This project may be referenced for academic purposes with proper attribution.

---

## 🙏 Acknowledgments

We would like to express our gratitude to: 

- 👩‍🏫 **Professor Houda Toukabri**:  For her guidance, support, and valuable feedback throughout the project
- 🏫 **ISET Kelibia**: For providing the educational framework and resources
- 👨‍👩‍👧‍👦 **Our Families**: For their unwavering support and encouragement
- 🐾 **Pet Owner Community**: For inspiring this solution and providing insights
- 💻 **Open Source Community**: For the excellent tools and libraries that made this project possible

---

## 📞 Contact

For inquiries, collaboration, or feedback:

- 📧 **Email**: Contact via GitHub profile
- 💼 **LinkedIn**: [Connect with us](https://www.linkedin.com/in/soumayabenahmed/)
- 🐙 **GitHub**: [@bnahmedsoumaya00](https://github.com/bnahmedsoumaya00)
- 📱 **Project Repository**: [HayawenTn_AppMobG2](https://github.com/bnahmedsoumaya00/HayawenTn_AppMobG2)

---

<div align="center">

### ⭐ If you find this project interesting, please consider giving it a star!  ⭐

**Built with dedication and passion for pet welfare in Tunisia** 🇹🇳 🐾

*From concept to deployment - A complete full-stack mobile development journey*

---

**ISET Kelibia | Academic Year 2025/2026 | License in Multimedia and Web Development**

</div>
