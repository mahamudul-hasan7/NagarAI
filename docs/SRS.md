# 📄 Software Requirements Specification (SRS) for NagarAI
### Standard: IEEE Std 830-1998 Format
**Project Name:** NagarAI (নগর-এআই) — Smart Municipal Governance Platform  
**Course:** System Analysis and Design (SAD) Lab  
**Author:** Mahamudul Hasan (Department of Computer Science & Engineering)  
**Version:** 1.0.0  
**Date:** Fall 2026  

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a complete, formal specification of the requirements for the **NagarAI** system. It details the functional and non-functional requirements, external interfaces, system constraints, and data requirements for both the Citizen Mobile Application and the Municipal Administrative Desktop Portal.

### 1.2 Scope
NagarAI is an end-to-end municipal governance and crowdsourced civic reporting system. The software enables citizens to report localized public infrastructure failures (e.g., waste dumping, ruptured water pipes, potholes, broken street lights) using their mobile devices. The backend leverages Artificial Intelligence (Computer Vision and Natural Language Processing) to categorize, deduplicate, and score the severity of incidents before dispatching them directly to relevant field inspectors and ward councilors.

### 1.3 Definitions, Acronyms, and Abbreviations
* **SRS:** Software Requirements Specification
* **SAD:** System Analysis and Design
* **NLP:** Natural Language Processing
* **CV:** Computer Vision
* **GIS:** Geographic Information System
* **SLA:** Service Level Agreement
* **NID:** National Identification Number
* **RBAC:** Role-Based Access Control

### 1.4 References
* IEEE Recommended Practice for Software Requirements Specifications (IEEE Std 830-1998)
* ISO/IEC/IEEE 29148:2018 Systems and software engineering — Life cycle processes — Requirements engineering
* Figma Mobile Prototype: [NagarAI Mobile](https://www.figma.com/design/Zr7zPutMbLYQQgD0HS2oc0/NagarAI-Mobile)
* Figma Desktop Prototype: [NagarAI Desktop](https://www.figma.com/design/xPXYxt9vMviNMMru0UGfWc/NagarAI-Desktop)

---

## 2. Overall Description

### 2.1 Product Perspective
NagarAI functions as a modern, distributed, cloud-hosted civic ecosystem consisting of:
1. **Citizen Mobile Client (iOS / Android / PWA):** For submission, tracking, and citizen feedback.
2. **Field Officer Mobile Interface:** For receiving task work-orders, navigation, and proof-of-work upload.
3. **Ward & City Admin Desktop Web Portal:** For analytics, manual escalations, departmental resource management, and SLA enforcement.
4. **AI Triage & Microservices Backend:** For image recognition, spatial clustering, and automated routing.

### 2.2 User Characteristics
| User Class | Description | Tech Literacy |
| :--- | :--- | :--- |
| **Citizen** | Urban resident reporting local infrastructure problems. | Basic to Intermediate |
| **Field Officer** | Municipal maintenance staff dispatched to repair physical issues. | Basic |
| **Ward Councilor / Admin** | Local government officer supervising civic resolution and SLAs. | Intermediate to Advanced |
| **System Administrator** | Technical administrator managing server nodes, AI models, and user roles. | Advanced |

### 2.3 Operating Environment
* **Mobile Clients:** Android 10+ and iOS 15+ devices with camera and GPS sensors.
* **Web Desktop Portal:** Modern web browsers (Google Chrome 110+, Mozilla Firefox 110+, Edge 110+, Safari 16+).
* **Database & Server:** Linux (Ubuntu 24.04 LTS), PostgreSQL 16 with PostGIS extension, Docker containerization.

### 2.4 Design and Implementation Constraints
1. **Connectivity:** Must support offline queueing of citizen reports when cellular connection drops, synchronizing when connectivity restores.
2. **Language Support:** Bilingual interface (Bengali and English) across both mobile and desktop.
3. **Data Privacy:** Personal citizen details (phone number, NID) must be encrypted at rest (AES-256) and masked for field personnel.

---

## 3. System Features & Functional Requirements

### 3.1 Module 1: User Management & Authentication
* **FR-1.1 (Registration):** The system shall allow citizens to sign up via phone number with OTP (One-Time Password) verification.
* **FR-1.2 (Role-Based Access):** The system shall enforce distinct access levels: `Citizen`, `FieldOfficer`, `WardSupervisor`, `MayorAdmin`, and `SysAdmin`.
* **FR-1.3 (Profile & Reputation):** The system shall track citizen credibility metrics (upvotes, verified reports) to penalize false or spam reports.

### 3.2 Module 2: Multimodal Incident Reporting
* **FR-2.1 (Media Capture):** The user shall be able to capture an in-app photo/video of the civic issue.
* **FR-2.2 (Geolocation Extraction):** The system shall automatically capture device GPS coordinates with an accuracy radius within $\pm 10$ meters.
* **FR-2.3 (Audio / Voice Notes):** The system shall allow users to record a voice note up to 60 seconds in length in Bengali or English.
* **FR-2.4 (Manual Override):** The user shall be able to manually adjust their location pin on an interactive map.

### 3.3 Module 3: AI Triage & Deduplication Engine
* **FR-3.1 (Visual Classification):** The AI module shall classify the uploaded photo into one of 5 main categories (`Waste Management`, `Roads & Footpaths`, `Water & Sewerage`, `Electricity & Lighting`, `Illegal Construction`) with a confidence score exceeding 85%.
* **FR-3.2 (Severity Assessment):** The AI module shall evaluate risk levels (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) based on visual threat indicators (e.g., exposed high-voltage wires = `CRITICAL`).
* **FR-3.3 (Spatial Deduplication):** If a new report is lodged within a 25-meter radius of an unresolved report under the same category, the system shall link it as a "Child Report" to prevent duplicated fieldwork.

### 3.4 Module 4: Work Order Dispatch & Field Resolution
* **FR-4.1 (Auto-Assignment):** Upon verification, the system shall assign the ticket to the designated Ward Maintenance Team based on geographical polygons.
* **FR-4.2 (Task Acceptance):** Field officers shall acknowledge tasks and switch status to `IN_PROGRESS`.
* **FR-4.3 (Proof of Resolution):** To mark a ticket as `RESOLVED`, the field officer must submit a real-time geotagged "After" photo from the site.

### 3.5 Module 5: Citizen Feedback & Verification Loop
* **FR-5.1 (Citizen Confirmation):** When marked resolved, the reporting citizen receives a notification with the "After" image to approve or challenge within 48 hours.
* **FR-5.2 (Escalation Protocol):** If a citizen rejects the resolution, the ticket is flagged to the Ward Supervisor for independent audit.

### 3.6 Module 6: Executive Analytics & Heatmap Dashboard
* **FR-6.1 (Interactive Map):** City officials shall view real-time incident clusters via geo-heatmaps.
* **FR-6.2 (SLA Metrics):** The dashboard shall calculate Average Time to Resolution (ATTR) per ward and per department.

---

## 4. Non-Functional Requirements (NFR)

### 4.1 Performance Requirements
* **NFR-1 (Response Time):** API response times for standard reporting endpoints must remain below 300 ms under a load of 5,000 concurrent requests.
* **NFR-2 (AI Inference):** Image classification and severity scoring must complete within $\le 2.5$ seconds of upload.

### 4.2 Security Requirements
* **NFR-3 (Data Encryption):** All communications must use TLS 1.3. Stored passwords and PII must be hashed using Argon2id.
* **NFR-4 (Authentication Tokens):** Ephemeral JWT tokens with a 15-minute expiration time accompanied by secure HTTP-only refresh tokens.

### 4.3 Reliability & Availability
* **NFR-5 (Uptime):** The system shall maintain an uptime SLA of 99.9% excluding planned maintenance.
* **NFR-6 (Disaster Recovery):** Automated daily PostgreSQL incremental backups with a Recovery Point Objective (RPO) $\le 1$ hour.

### 4.4 Usability & Accessibility
* **NFR-7 (Accessibility):** The mobile application must adhere to WCAG 2.1 AA contrast requirements and support screen readers in Bengali and English.
* **NFR-8 (Clean UI):** First-time users shall be able to complete an incident report in under 45 seconds.

---

## 5. Verification & Acceptance Criteria
| Requirement ID | Verification Method | Acceptance Criteria |
| :--- | :--- | :--- |
| **FR-2.1 & 2.2** | Automated Testing | Report payload contains valid binary image and valid lat/long within Bangladesh boundaries. |
| **FR-3.1** | Confusion Matrix Evaluation | AI model validation accuracy $\ge 88\%$ across standard benchmark test set. |
| **FR-4.3** | Functional Test | Field officer cannot transition state to `RESOLVED` without a verified geotagged image attachment. |
| **NFR-1** | Stress Testing (k6 / Locust) | 95th percentile latency $\le 500$ ms with 5,000 simulated users. |
