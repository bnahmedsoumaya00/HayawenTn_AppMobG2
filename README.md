```markdown
<div align="center">

# 🐾 HayawenTn 
### *Mobile E-Commerce Platform for Pets in Tunisia*

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express" alt="Express"/>
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
</p>

<p align="center">
  <strong>🎓 Integration Project - License in Multimedia and Web Development</strong><br/>
  <em>Higher Institute of Technological Studies of Kelibia (ISET Kelibia)</em>
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-team">Team</a> •
  <a href="#-contact">Contact</a>
</p>

<h3>حيوانات تونس - Animals of Tunisia</h3>

</div>

<br/>

## 📖 About The Project

> **HayawenTn** (حيوانات تونس - "Animals of Tunisia") is a comprehensive cross-platform mobile e-commerce application that bridges the gap between pet owners, sellers, and veterinary services across Tunisia.

<table>
<tr>
<td width="50%">

### 🎯 Project Context

This application represents our **Final Year Integration Project (PFE)** for academic year **2024/2025**, developed as part of the **License in Multimedia and Web Development** program at **ISET Kelibia**, Tunisia.

</td>
<td width="50%">

### 🏆 Project Goals

Create a unified, secure, and user-friendly mobile platform that revolutionizes pet care services accessibility in Tunisia.

</td>
</tr>
</table>

### 🤔 The Problem

<table>
<tr>
<td align="center" width="25%">
  <h4>🏪 Limited Access</h4>
  <p>Specialized pet stores are scarce and concentrated only in major cities</p>
</td>
<td align="center" width="25%">
  <h4>📊 Fragmented Info</h4>
  <p>Veterinary services information is scattered and difficult to find</p>
</td>
<td align="center" width="25%">
  <h4>🔍 No Platform</h4>
  <p>Lack of secure, transparent marketplace for pet adoption and sales</p>
</td>
<td align="center" width="25%">
  <h4>⚠️ Trust Issues</h4>
  <p>No centralized system to verify sellers or services</p>
</td>
</tr>
</table>

### ✨ Our Solution

<div align="center">

| Feature | Description | Benefit |
|:-------:|:------------|:--------|
| 🛒 **Product Marketplace** | Browse and search pet products by category | Easy access to pet supplies |
| 🏥 **Vet Directory** | Find qualified veterinarians filtered by specialty | Quick healthcare access |
| 📢 **Announcements** | Post and browse pet sale/adoption listings with photos | Transparent pet marketplace |
| ⭐ **Favorites System** | Save and manage preferred announcements | Personalized experience |
| 🔐 **Secure Platform** | JWT authentication and encrypted data storage | Safe transactions |

</div>

---

## 🚀 Key Features

<table>
<tr>
<td width="33%" valign="top">

### 🐕 For Pet Owners

```
✓ Browse pet products
  • Search functionality
  • Category filters
  
✓ Find veterinarians
  • Filter by specialty
  • Dogs, cats, birds, exotic
  
✓ Adoption & sales
  • View announcements
  • Save favorites
  
✓ Direct contact
  • Reach sellers
  • Contact vets
```

</td>
<td width="33%" valign="top">

### 🏪 For Sellers & Breeders

```
✓ Create announcements
  • Detailed descriptions
  • Upload 5 photos max
  
✓ Manage listings
  • Edit anytime
  • Delete when sold
  
✓ Reach audience
  • Targeted pet owners
  • Direct inquiries
  
✓ Build reputation
  • User interactions
  • Platform visibility
```

</td>
<td width="33%" valign="top">

### 🏥 For Veterinarians

```
✓ Professional listing
  • Directory presence
  • Clinic details
  
✓ Showcase expertise
  • Display specialties
  • Contact information
  
✓ Digital presence
  • Increase visibility
  • Accessibility
  
✓ Client reach
  • Connect with owners
  • Build clientele
```

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### 📱 Frontend Architecture

<table>
<tr>
<td align="center" width="50%">

**Core Technologies**
```javascript
React Native + Expo
├── React Navigation 6.x
├── Axios
├── React Hooks
│   ├── useState
│   ├── useEffect
│   └── useContext
└── Expo ImagePicker
```

</td>
<td align="center" width="50%">

**Key Features**
- ⚡ Cross-platform (iOS & Android)
- 🎨 Custom UI components
- 🔄 Real-time state management
- 📸 Multi-image upload support
- 🚀 Hot reloading with Expo

</td>
</tr>
</table>

### 🔧 Backend Architecture

<table>
<tr>
<td align="center" width="50%">
<div align="center">

```
╔═══════════════════════════════════════════════════════════════════╗
║                    📱 MOBILE APPLICATION LAYER                     ║
║                     (React Native + Expo)                          ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          ║
║   │   🔐 Auth    │  │  🛒 Products │  │ 📢 Announces │          ║
║   │   Screens    │  │    Screens   │  │   Screens    │          ║
║   └──────────────┘  └──────────────┘  └──────────────┘          ║
║                                                                    ║
║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          ║
║   │  🏥 Vets     │  │  ⭐ Favorites│  │  👤 Profile  │          ║
║   │   Screens    │  │    Screens   │  │   Screens    │          ║
║   └──────────────┘  └──────────────┘  └──────────────┘          ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
                               │
                               │ 🔗 HTTP/HTTPS
                               │    (Axios)
                               ▼
╔═══════════════════════════════════════════════════════════════════╗
║                     ⚙️ REST API LAYER (Express.js)                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║   Routes ➜ Controllers ➜ Models ➜ Database                       ║
║                                                                    ║
║   🔒 Middleware Stack:                                            ║
║   ├─ JWT Authentication                                           ║
║   ├─ Multer File Upload                                           ║
║   ├─ Input Validation                                             ║
║   └─ Error Handling                                               ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
                               │
                               │ 📊 SQL Queries
                               │  (Prepared Statements)
                               ▼
╔═══════════════════════════════════════════════════════════════════╗
║                     💾 DATABASE LAYER (MySQL 8.0)                 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║   ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────┐   ║
║   │  Users   │  │ Products │  │ Announcements│  │   Vets   │   ║
║   │    👤    │  │    🛒    │  │      📢      │  │    🏥    │   ║
║   └─────┬────┘  └──────────┘  └──────┬───────┘  └──────────┘   ║
║         │                             │                           ║
║         └──────────┬──────────────────┘                           ║
║                    │                                               ║
║              ┌─────▼──────┐                                       ║
║              │ Favorites  │                                       ║
║              │     ⭐     │                                       ║
║              └────────────┘                                       ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

</div> Prepared Statements
├── Foreign Key Constraints
├── Indexed Columns
└── Transaction Support
```

</td>
<td align="center" width="50%">

**Security Features**
- 🛡️ SQL injection prevention
- 🔗 Data integrity constraints
- ⚡ Query optimization
- 🔄 ACID compliance

</td>
</tr>
</table>

### 🔨 Development Tools

<p align="center">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/>
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman"/>
  <img src="https://img.shields.io/badge/MySQL_Workbench-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL Workbench"/>
</p>

</div>

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
<div align="center">

### 📋 Prerequisites

<table>
<tr>
<td align="center" width="25%">
  <img src="https://img.shields.io/badge/Node.js-v14+-43853D?style=for-the-badge&logo=node.js&logoColor=white"/><br/>
  <strong>Node.js</strong><br/>
  v14 or higher
</td>
<td align="center" width="25%">
  <img src="https://img.shields.io/badge/MySQL-v8.0+-00758F?style=for-the-badge&logo=mysql&logoColor=white"/><br/>
  <strong>MySQL</strong><br/>
  v8.0 or higher
</td>
<td align="center" width="25%">
  <img src="https://img.shields.io/badge/Expo_CLI-000020?style=for-the-badge&logo=expo&logoColor=white"/><br/>
  <strong>Expo CLI</strong><br/>
  Latest version
</td>
<td align="center" width="25%">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/><br/>
  <strong>Git</strong><br/>
  Version control
</td>
</tr>
</table>

</div>

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

<table>
<tr>
<td width="50%">

#### 📦 Install Dependencies

```bash
# Navigate to backend folder
cd hayawenTn-backend

# Install all dependencies
npm install
```

</td>
<td width="50%">

#### ⚙️ Configure Environment

```bash
# Create .env file
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hayawentn_db
JWT_SECRET=your_secure_jwt_secret
EOF
```

</td>
</tr>
</table>

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

<div align="center">
<strong>✅ Backend running at:</strong> <code>http://localhost:5000</code>
</div>

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

> Replace `YOUR_IP` with your local IP address

</td>
</tr>
</table>

#### 🚀 Start Expo Development Server

```bash
npx expo start
```

<div align="center">

**📱 Run on Device:**

| Platform | Action |
|:--------:|:-------|
| 📱 Android | Press `a` or scan QR with Expo Go |
| 🍎 iOS | Press `i` or scan QR with Expo Go |
| 🌐 Web | Press `w` for web browser |

</div>
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
<div align="center">

<table>
<tr>
<th width="30%">🔒 Security Layer</th>
<th width="40%">Implementation</th>
<th width="30%">Protection Level</th>
</tr>
<tr>
<td align="center"><strong>Password Security</strong></td>
<td>bcrypt hashing with 10 salt rounds</td>
<td align="center">🛡️🛡️🛡️ High</td>
</tr>
<tr>
<td align="center"><strong>Authentication</strong></td>
<td>JWT tokens with 7-day expiration</td>
<td align="center">🛡️🛡️🛡️ High</td>
</tr>
<tr>
<td align="center"><strong>SQL Injection Prevention</strong></td>
<td>Prepared statements for all queries</td>
<td align="center">🛡️🛡️🛡️ High</td>
</tr>
<tr>
<td align="center"><strong>Input Validation</strong></td>
<td>express-validator on all endpoints</td>
<td align="center">🛡️🛡️ Medium</td>
</tr>
<tr>
<td align="center"><strong>File Upload Security</strong></td>
<td>MIME type validation, 5MB size limit</td>
<td align="center">🛡️🛡️ Medium</td>
</tr>
<tr>
<td align="center"><strong>Access Control</strong></td>
<td>Users can only modify their own content</td>
<td align="center">🛡️🛡️🛡️ High</td>
</tr>
<tr>
<td align="center"><strong>Data Encryption</strong></td>
<td>HTTPS in production environment</td>
<td align="center">🛡️🛡️🛡️ High</td>
</tr>
</table>

</div>
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
-div align="center">

### 💻 Development Team

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/bnahmedsoumaya00.png" width="150px;" alt="Soumaya Ben Ahmed" style="border-radius: 50%; border: 3px solid #4CAF50;"/><br />
      <h3>Soumaya Ben Ahmed</h3>
      <p><strong>⚙️ Backend Developer</strong></p>
      <p>
        🔧 Database Design & Architecture<br/>
        🚀 REST API Development<br/>
        🔐 Security Implementation<br/>
        📊 Data Modeling
      </p>
      <p>
        <a href="https://github.com/bnahmedsoumaya00">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </p>
    </td>
    <td align="center" width="50%">
      <div style="width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <h1 style="color: white; margin: 0;">TB</h1>
      </div>
      <h3>Tasnime Ben Salah</h3>
      <p><strong>📱 Frontend Developer</strong></p>
      <p>
        🎨 UI/UX Design<br/>
        📱 Mobile Development<br/>
        ⚛️ React Native Implementation<br/>
        🎯 User Experience Optimization
      </p>
      <p>
        <img src="https://img.shields.io/badge/React_Native-Specialist-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
      </p>
    </td>
  </tr>
</table>

---

### 👩‍🏫 Academic Supervision

<table>
<tr>
<td align="center">
  <h3>Professor Houda Toukabri</h3>
  <p><strong>🎓 Project Supervisor</strong></p>
  <p>Higher Institute of Technological Studies of Kelibia (ISET Kelibia)</p>
</td>
</tr>
</table>

</div> documentation, tutorials, and community solutions
- 🔄 **Adaptability**: Pivoting from Firebase to MySQL based on project needs

#### Professional Skills
- 📝 **Technical Documentation**: Writing clear README, API docs, and code comments
- 🎨 **UI/UX Design**:  Collaborative design process using Figma
- ⏰ **Time Management**: Meeting deadlines while maintaining code quality
- 🎤 **Presentation**:  Preparing project demonstrations and defending technical choices

---

## 📈 Project Workflow

### Development Methodology:  Agile Scrum
<div align="center">

### 💬 Get In Touch

<p>For inquiries, collaboration, or feedback, feel free to reach out!</p>

<table>
<tr>
<td align="center" width="25%">
  <a href="https://github.com/bnahmedsoumaya00">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/><br/>
    <strong>@bnahmedsoumaya00</strong>
  </a>
</td>
<td align="center" width="25%">
  <a href="https://www.linkedin.com/in/soumayabenahmed/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/><br/>
    <strong>Connect with us</strong>
  </a>
</td>
<td align="center" width="25%">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/><br/>
  <strong>Via GitHub Profile</strong>
</td>
<td align="center" width="25%">
  <a href="https://github.com/bnahmedsoumaya00/HayawenTn_AppMobG2">
    <img src="https://img.shields.io/badge/Repository-181717?style=for-the-badge&logo=github&logoColor=white"/><br/>
    <strong>View Project</strong>
  </a>
</td>
</tr>
</table>

<br/>

---

<h3>⭐ Star this repository if you find it interesting! ⭐</h3>

<p>
  <img src="https://img.shields.io/github/stars/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social" alt="GitHub forks"/>
  <img src="https://img.shields.io/github/watchers/bnahmedsoumaya00/HayawenTn_AppMobG2?style=social" alt="GitHub watchers"/>
</p>

<br/>

<table>
<tr>
<td align="center">
  <h3>🇹🇳 Built with dedication and passion for pet welfare in Tunisia 🐾</h3>
  <p><em>From concept to deployment - A complete full-stack mobile development journey</em></p>
</td>
</tr>
</table>

<br/>

<p>
  <img src="https://img.shields.io/badge/ISET_Kelibia-Education-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Academic_Year-2024/2025-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-Multimedia_&_Web_Dev-orange?style=for-the-badge"/>
</p>

<br/>

---

<p>
  <strong>Made with ❤️ by Soumaya Ben Ahmed & Tasnime Ben Salah</strong><br/>
  <sub>© 2025 HayawenTn. All Rights Reserved.</sub>
</p>
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
