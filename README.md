# 🏥 Hospital Management System

A comprehensive web-based hospital management system built with React.js frontend and Node.js backend, featuring role-based access control for patients, doctors, and administrators.

## 🌟 Features

### 👥 User Management

- **Multi-role Authentication**: Support for Patients, Doctors, and Administrators
- **Secure Registration & Login**: JWT-based authentication with bcrypt password hashing
- **Role-based Access Control**: Different interfaces and permissions for each user type

### 👨‍⚕️ Doctor Management

- **Doctor Registration**: Admins can add new doctors with specialties and experience
- **Doctor Profiles**: Complete profiles including specialization and years of experience
- **Schedule Management**: Admins can create appointment schedules for doctors
- **Doctor Directory**: View all available doctors and their specializations

### 📅 Appointment System

- **Appointment Booking**: Patients can book available appointment slots
- **Real-time Availability**: View available appointment slots in real-time
- **Conflict Prevention**: Prevents double-booking of appointment slots
- **Status Tracking**: Track appointment status (Pending, Confirmed, Completed, Cancelled)

### 🎯 Role-Specific Features

#### 👤 Patient Features

- Browse available doctors and their specializations
- Book appointments with available time slots
- View personal booking history and status
- Real-time appointment status updates

#### 👨‍⚕️ Doctor Features

- View assigned appointments and patient details
- Track appointment status and patient information
- Manage personal schedule and availability

#### 👨‍💼 Admin Features

- Add new doctors to the system
- Create and manage doctor schedules
- Monitor all appointments across the hospital
- Update appointment statuses
- Comprehensive system oversight

## 🛠️ Technology Stack

### Frontend

- **React.js 18.3.1** - Modern UI framework
- **CSS3** - Custom styling with responsive design
- **React Hooks** - State management and side effects

### Backend

- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database Schema

- **ACCOUNTS** - User authentication and role management
- **DOCTOR_PROFILES** - Doctor-specific information
- **SCHEDULES** - Appointment time slots
- **BOOKINGS** - Patient appointment bookings

## 📁 Project Structure

```
hospital-management-system/
├── 📁 myapp/                          # React Frontend
│   ├── 📁 public/                     # Static files
│   │   ├── 📁 src/
│   │   │   ├── 📁 Components/             # React components
│   │   │   │   ├── AddDoctorForm.js       # Admin: Add new doctors
│   │   │   │   ├── AddDoctorSchedule.js   # Admin: Create doctor schedules
│   │   │   │   ├── AdminAppointments.js   # Admin: Manage all appointments
│   │   │   │   ├── DoctorAppointments.js  # Doctor: View appointments
│   │   │   │   ├── DoctorsList.js         # View doctors & book appointments
│   │   │   │   ├── Home.js                # Landing page
│   │   │   │   ├── LoginForm.js           # User authentication
│   │   │   │   ├── Main.js                # Main app router
│   │   │   │   ├── NavBar.js              # Navigation component
│   │   │   │   ├── RegistrationForm.js    # User registration
│   │   │   │   ├── UserBookings.js        # Patient: View bookings
│   │   │   │   └── *.css                  # Component stylesheets
│   │   │   ├── App.js                     # Main App component
│   │   │   ├── index.js                   # React entry point
│   │   │   └── *.css                      # Global styles
│   │   ├── package.json                   # Frontend dependencies
│   │   └── README.md                      # Frontend documentation
├── 📁 server/                         # Node.js Backend
│   ├── server.js                      # Main server file
│   ├── Db.js                          # Database configuration
│   ├── addAdmin.js                    # Admin creation utility
│   └── hospital.db                    # SQLite database
├── package.json                       # Backend dependencies
├── .gitignore                         # Git ignore rules
└── README.md                          # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hospital-management-system
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:555`

### Frontend Setup

1. **Navigate to the React app directory**

   ```bash
   cd myapp
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Database Setup

The system uses SQLite and automatically creates the required tables:

- `ACCOUNTS` - User accounts and authentication
- `DOCTOR_PROFILES` - Doctor information and specialties
- `SCHEDULES` - Available appointment time slots
- `BOOKINGS` - Patient appointment bookings

### Environment Variables

The system uses default configurations, but you can modify:

- **Server Port**: Default `555` (in `server.js`)
- **JWT Secret**: Default `HospitalManagementSecretKey2025` (in `server.js`)
- **CORS Origin**: Default `http://localhost:3000` (in `server.js`)

## 👥 User Roles & Permissions

### 🔐 Admin

- **Full System Access**: Complete control over the hospital management system
- **Doctor Management**: Add new doctors and manage their profiles
- **Schedule Management**: Create and manage appointment schedules
- **Appointment Oversight**: View and update all appointment statuses
- **System Monitoring**: Comprehensive view of all system activities

### 👨‍⚕️ Doctor

- **Appointment Viewing**: See assigned appointments and patient details
- **Schedule Awareness**: View personal schedule and availability
- **Patient Information**: Access patient details for appointments
- **Status Tracking**: Monitor appointment status changes

### 👤 Patient

- **Doctor Browsing**: View available doctors and their specializations
- **Appointment Booking**: Book available appointment slots
- **Booking Management**: View personal booking history
- **Status Monitoring**: Track appointment status updates

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Role-based Access**: Strict permission control based on user roles
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries

## 📱 User Interface

### Modern Design

- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Role-based navigation menus
- **Status Indicators**: Color-coded appointment status badges
- **Clean Typography**: Professional and readable design
- **Interactive Elements**: Hover effects and smooth transitions

### Color-coded Status System

- 🟡 **Pending** - Yellow badge for new appointments
- 🟢 **Confirmed** - Green badge for confirmed appointments
- 🔵 **Completed** - Blue badge for completed appointments
- 🔴 **Cancelled** - Red badge for cancelled appointments

## 🔄 API Endpoints

### Authentication

- `POST /user/register` - User registration
- `POST /user/login` - User login
- `POST /logout` - User logout

### Doctor Management

- `POST /doctor/add` - Add new doctor (Admin only)
- `GET /doctors` - Get all doctors
- `POST /doctor/schedule` - Add doctor schedule (Admin only)
- `GET /doctor/schedules/:doctorId` - Get doctor schedules

### Appointment Management

- `POST /booking/create` - Create appointment booking
- `GET /user/bookings` - Get user bookings
- `GET /doctor/bookings` - Get doctor appointments
- `GET /admin/bookings` - Get all appointments (Admin only)
- `PUT /booking/status/:id` - Update booking status (Admin only)
- `GET /schedules/available` - Get available appointment slots

## 🚀 Deployment

### Production Build

1. **Build the React app**

   ```bash
   cd myapp
   npm run build
   ```

2. **Configure production server**
   - Update CORS origin to your domain
   - Set environment variables for production
   - Configure database for production use

### Deployment Options

- **Heroku**: Easy deployment with Procfile
- **Vercel**: Frontend deployment with automatic builds
- **AWS**: Scalable cloud deployment
- **DigitalOcean**: VPS deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Your Name**

- GitHub: [@omarmamdoh](https://github.com/omarmamdoh)
  
## 🙏 Acknowledgments

- React.js community for the excellent framework
- Express.js for the robust backend framework
- SQLite for the lightweight database solution
- All contributors and testers

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/omarmamdoh/hospital-management-system/issues) page
2. Create a new issue with detailed description
3. Contact the development team

**Happy Coding! 🎉**
