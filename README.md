# Klinik HealthEase

**Klinik HealthEase** is a modern clinic information platform built to make daily operations faster, cleaner, and more connected in one integrated website.

The platform unifies the full clinic service journey: patient registration, doctor scheduling, digital medical records, billing, notifications, and first-line communication through an AI assistant.

## What This Website Delivers

- A unified digital ecosystem for front office teams, doctors, administrators, and patients.
- A streamlined workflow that reduces repetitive manual steps.
- A modern, responsive user experience across desktop and mobile.

## Core Features

- **Role-Based Dashboards**
  - Dedicated interfaces for **Admin**, **Doctor**, **Receptionist**, and **Patient** roles.

- **Digital Patient Registration**
  - Registration forms aligned with Indonesian ID card (KTP) fields.
  - **Camera-based KTP OCR autofill** to populate key fields automatically.

- **Queue, Schedule, and Visit Management**
  - End-to-end handling for patient visits, doctor schedules, active queue status, and check-in flow.

- **Electronic Medical Records**
  - Structured and role-aware medical record management for better traceability.

- **Billing and Payment Operations**
  - Billing creation and payment confirmation to simplify clinic administration.

- **Notification Center**
  - Real-time status updates to keep clinic teams and patients synchronized.

- **Patient Self-Service Settings**
  - Patients can update dashboard language, username, and password from their own settings page.

- **Patient Card and QR Workflow**
  - Patient cards are simplified around core identity details: **Name** and **Medical Record Number (No. RM)**.
  - Patient QR images are served through a resilient endpoint with runtime fallback generation.
  - Receptionist-side scanning accepts QR URLs and raw tokens more reliably in production deployments.

- **AI Customer Support Widget**
  - Fast first-response assistant for common user questions.

- **Modern UI System**
  - Global Light/Dark theme toggle across landing, auth, and role pages.
  - Consistent validation and confirmation popup patterns.
  - Responsive layouts optimized for mobile interaction.

## Why HealthEase Stands Out

- **End-to-End Clinic Workflow**
  - Core clinic processes run in one connected platform.

- **Operational Efficiency**
  - Less admin bottleneck, faster team execution.

- **Better Patient Experience**
  - Clearer service flow from registration to follow-up.

- **Scalable Foundation**
  - Built on a modern architecture for long-term feature expansion.

- **Consistent Product Experience**
  - Unified visual language and interaction patterns across modules.

## Ideal For

- Clinics moving from manual workflows to an integrated digital system.
- Operations teams that need cleaner, near real-time data control.
- Healthcare services aiming to deliver a more modern patient experience.

## Deployment Notes

- Set `APP_URL` in production to the public application URL so generated QR codes always point to the correct patient scan page.
- If `APP_URL` is not set, the app now falls back to forwarded host/protocol headers when generating patient scan QR codes.

## Product Vision

To help clinics operate with better structure, faster execution, and stronger service quality through a practical, professional, and scalable digital platform.
