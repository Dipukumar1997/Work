#!/bin/bash

# Base folder
SRC="src"

# Create directories
mkdir -p $SRC/components
mkdir -p $SRC/pages/Admission
mkdir -p $SRC/pages/Admin
mkdir -p $SRC/pages/Student
mkdir -p $SRC/pages/Teacher
mkdir -p $SRC/services
mkdir -p $SRC/context

# Create component files
touch $SRC/components/Navbar.jsx
touch $SRC/components/Sidebar.jsx
touch $SRC/components/ProtectedRoute.jsx

# Create main pages
touch $SRC/pages/Home.jsx
touch $SRC/pages/Login.jsx

# Admission pages
touch $SRC/pages/Admission/AdmissionForm.jsx
touch $SRC/pages/Admission/AdmissionSuccess.jsx

# Admin pages
touch $SRC/pages/Admin/AdminDashboard.jsx
touch $SRC/pages/Admin/Students.jsx
touch $SRC/pages/Admin/Teachers.jsx
touch $SRC/pages/Admin/Admissions.jsx
touch $SRC/pages/Admin/Subjects.jsx
touch $SRC/pages/Admin/Exams.jsx

# Student pages
touch $SRC/pages/Student/StudentDashboard.jsx
touch $SRC/pages/Student/Profile.jsx
touch $SRC/pages/Student/Documents.jsx
touch $SRC/pages/Student/Exams.jsx
touch $SRC/pages/Student/Payment.jsx
touch $SRC/pages/Student/Applications.jsx

# Teacher pages
touch $SRC/pages/Teacher/TeacherDashboard.jsx
touch $SRC/pages/Teacher/Profile.jsx
touch $SRC/pages/Teacher/Students.jsx
touch $SRC/pages/Teacher/AttendanceMark.jsx

# Service file
touch $SRC/services/api.js

# Context
touch $SRC/context/AuthContext.jsx

# Root files
touch $SRC/App.jsx
touch $SRC/main.jsx
touch $SRC/index.css

echo "Project structure created successfully!"
