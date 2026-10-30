# 🏙️ NagarAI (নগর-এআই)
### Next-Gen AI-Powered Civic Issue Reporting & Smart Municipal Governance Platform

[![Course](https://img.shields.io/badge/Course-System%20Analysis%20%26%20Design%20(SAD)%20Lab-blue?style=for-the-badge)](docs/SRS.md)
[![Figma Mobile](https://img.shields.io/badge/Figma-Mobile%20Prototype-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/Zr7zPutMbLYQQgD0HS2oc0/NagarAI-Mobile?node-id=0-1&t=OQEn6nY5H6vatiCX-1)
[![Figma Desktop](https://img.shields.io/badge/Figma-Desktop%20Dashboard-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/xPXYxt9vMviNMMru0UGfWc/NagarAI-Desktop?t=OQEn6nY5H6vatiCX-1)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📌 1. Project Overview & Motivation

In rapidly urbanizing cities, municipal corporations struggle to detect, categorize, prioritize, and resolve localized civic grievances—such as illegal roadside dumping, open potholes, waterlogging, ruptured water supply pipes, and dysfunctional streetlamps. Traditional manual complaint management hotlines suffer from:
1. **High Bureaucratic Latency**: Unstructured complaints bouncing between incorrect departments.
2. **Lack of Transparency**: Citizens have zero visibility into task assignment or ground progress.
3. **Absence of Intelligent Prioritization**: Critical public safety hazards (e.g., exposed electric wires) get buried under standard requests.

**NagarAI** bridges the gap between citizens and municipal authorities by combining **Mobile Crowdsourcing** with **Computer Vision and NLP Triage**. Citizens upload photos/videos with automated geo-tagging; the NagarAI engine automatically classifies issue type, estimates severity, assigns jurisdiction, dispatches field officers, and monitors resolution SLAs.

---

## 🎨 2. UI/UX Prototypes (Figma Direct Links)

The user interface and user experience have been systematically researched, wireframed, and prototyped in Figma for both Mobile (Citizen-Centric) and Desktop (Administrative Command Center) viewports:

| Platform | Target Audience | Interactive Figma Prototype |
| :--- | :--- | :--- |
| **📱 NagarAI Mobile App** | Citizens, Field Workers | [🔗 Open NagarAI Mobile Prototype](https://www.figma.com/design/Zr7zPutMbLYQQgD0HS2oc0/NagarAI-Mobile?node-id=0-1&t=OQEn6nY5H6vatiCX-1) |
| **🖥️ NagarAI Desktop Portal** | City Ward Councilors, Municipal Officers, Admins | [🔗 Open NagarAI Desktop Prototype](https://www.figma.com/design/xPXYxt9vMviNMMru0UGfWc/NagarAI-Desktop?t=OQEn6nY5H6vatiCX-1) |

---

## 🧠 3. System Analysis & Design (SAD) Architecture

This repository contains full software engineering artifacts adhering to IEEE standards for System Analysis and Design.

### 3.1. Use Case Diagram
The diagram below illustrates the interactions between Primary Actors (**Citizen**, **Field Officer**, **Municipal Admin**) and the **NagarAI Triage Engine**.

```mermaid
flowchart TD
    subgraph Actors
        C["Citizen (Mobile User)"]
        A["NagarAI Core Engine"]
        F["Field Inspection Team"]
        M["Municipal Admin / Ward Council"]
    end

    subgraph SystemBoundary["NagarAI System Boundary"]
        UC1["Submit Civic Report (Photo, Audio, GPS)"]
        UC2["Automated AI Triage & Severity Scoring"]
        UC3["Duplicate Detection & Cluster Mapping"]
        UC4["Assign Ticket to Ward Department"]
        UC5["Inspect & Upload Resolution Proof"]
        UC6["Real-time Status Tracking & Feedback"]
        UC7["City-wide Heatmap & SLA Analytics"]
    end

    C --> UC1
    UC1 --> A
    A --> UC2
    A --> UC3
    UC2 --> UC4
    UC4 --> F
    F --> UC5
    UC5 --> C
    C --> UC6
    M --> UC7
    M --> UC4
```

---

### 3.2. Data Flow Diagram (DFD Level 0 - Context Level)
High-level information boundary between external entities and the central NagarAI system.

```mermaid
flowchart LR
    Citizen["Citizen"]
    System["NagarAI Central Platform"]
    Authority["City Municipal Authority"]
    Worker["Field Worker"]

    Citizen -->|"Incident Report (Photo, Location, Description)"| System
    System -->|"Ticket Confirmation & Live Status Notifications"| Citizen

    System -->|"Departmental Work Orders & Heatmaps"| Authority
    Authority -->|"Resolution Policies & Priority Overrides"| System

    System -->|"Assigned Task Dispatch & Route"| Worker
    Worker -->|"Resolution Proof (After-Photo & Timestamp)"| System
```

---

### 3.3. Data Flow Diagram (DFD Level 1 - Process Breakdown)
Detailed internal processes for reporting, machine learning triage, assignment, and feedback verification.

```mermaid
flowchart TD
    D1[("Users Store")]
    D2[("Incidents & Reports Store")]
    D3[("Departments & Ward Directory")]

    P1["1.0 User Authentication & Geolocation Tagging"]
    P2["2.0 AI Classification & Duplicate Detection"]
    P3["3.0 Automated Routing & Dispatch Engine"]
    P4["4.0 Field Execution & Resolution Verification"]
    P5["5.0 Analytics & Public Transparency Portal"]

    Citizen["Citizen"] -->|"Login & Report Data"| P1
    P1 <-->|"Validate Credentials"| D1
    P1 -->|"Sanitized Report"| P2
    P2 <-->|"Check Spatial Proximity (Duplicate Check)"| D2
    P2 -->|"Classified Incident"| P3
    P3 <-->|"Fetch Ward Responsible Unit"| D3
    P3 -->|"Work Order"| FieldStaff["Field Worker"]
    FieldStaff -->|"Resolved Image & Completion Tag"| P4
    P4 -->|"Update Status"| D2
    P4 -->|"SMS / App Push Notification"| Citizen
    D2 -->|"Aggregated Incident Data"| P5
    P5 -->|"SLA Metrics & Geo-Heatmaps"| Admin["Ward Admin"]
```

---

### 3.4. Entity Relationship Diagram (ERD)
Relational schema designed for high-concurrency municipal data and GIS spatial querying.

```mermaid
erDiagram
    CITIZEN ||--o{ INCIDENT_REPORT : submits
    INCIDENT_REPORT ||--|| AI_EVALUATION : analyzed_by
    INCIDENT_REPORT ||--o{ TICKET_TIMELINE : tracks
    DEPARTMENT ||--o{ FIELD_OFFICER : employs
    DEPARTMENT ||--o{ INCIDENT_REPORT : assigned_to
    FIELD_OFFICER ||--o{ TICKET_TIMELINE : updates

    CITIZEN {
        uuid id PK
        string full_name
        string phone_number UK
        string nid_number
        string email
        timestamp registered_at
    }

    INCIDENT_REPORT {
        uuid id PK
        uuid citizen_id FK
        uuid department_id FK
        string title
        text description
        float latitude
        float longitude
        string ward_number
        string media_url
        string status "PENDING | ASSIGNED | IN_PROGRESS | RESOLVED"
        timestamp reported_at
        timestamp resolved_at
    }

    AI_EVALUATION {
        uuid id PK
        uuid report_id FK
        string detected_category "Road | Garbage | Water | Electric"
        float confidence_score
        string severity_level "LOW | MEDIUM | HIGH | CRITICAL"
        boolean is_potential_duplicate
        uuid duplicate_parent_id
    }

    DEPARTMENT {
        uuid id PK
        string name "Waste Mgmt | Road Repair | WASA | Power"
        string ward_coverage
        string contact_email
        int active_officers_count
    }

    FIELD_OFFICER {
        uuid id PK
        uuid department_id FK
        string name
        string badge_id UK
        string contact_phone
        boolean is_available
    }

    TICKET_TIMELINE {
        uuid id PK
        uuid report_id FK
        uuid updated_by_officer_id FK
        string previous_status
        string new_status
        string comment
        string verification_media_url
        timestamp updated_at
    }
```

---

### 3.5. System Sequence Diagram (Incident Lifecycle)

```mermaid
sequenceDiagram
    autonumber
    actor C as Citizen (Mobile)
    participant GW as API Gateway
    participant AI as AI Triage Service
    participant DB as Postgres Database
    actor W as Field Officer
    actor A as Ward Councilor

    C->>GW: POST /api/v1/incidents (Photo, Lat/Lng, Voice/Text)
    GW->>AI: Analyze Image & Description
    Note over AI: Vision model detects "Severed Water Main" (Critical)
    AI-->>GW: Category: Water, Severity: CRITICAL, Confidence: 0.96
    GW->>DB: INSERT into incidents & ai_evaluations
    GW->>W: Push Notification: Urgent Task Assigned
    GW-->>C: Ticket #NA-9021 Created (Status: Assigned)
    
    W->>GW: PUT /api/v1/incidents/NA-9021/status (IN_PROGRESS)
    W->>W: Performs on-site repair
    W->>GW: POST /api/v1/incidents/NA-9021/resolve (Proof Photo)
    GW->>DB: UPDATE status to RESOLVED
    GW-->>C: SMS/Push: Issue marked Resolved. Tap to verify.
    C->>GW: POST /api/v1/incidents/NA-9021/verify (Rating: 5/5)
    GW->>A: Analytics update on Ward Dashboard
```

---

## ⚡ 4. Core Features & Capabilities

1. **Multimodal Incident Reporting**:
   - Audio notes in Bengali & English transcribed automatically using Whisper AI.
   - High-precision GPS reverse-geocoding (Ward, Thana, District, Road detection).
2. **Computer Vision Damage Assessment**:
   - Classifies potholes, open drainage, trash accumulation, hazardous wires.
   - Filters out spam or non-civic photos automatically.
3. **Automated Triage & Deduplication Engine**:
   - Clusters incident reports within a 25-meter spatial radius and flags duplicates.
   - Prevents overwhelming field teams with 20 tickets for the same pothole.
4. **Administrative Command Center (Desktop)**:
   - Dynamic Geo-JSON Heatmaps showing problem clusters across city zones.
   - SLA tracking countdown timers ensuring accountability.
5. **Transparency & Citizen Feedback Loop**:
   - Double-verification system: A ticket is not closed until the citizen verifies the "After" proof photo or the grace period expires.

---

## 📁 5. Repository Structure

```text
NagarAI/
│
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI Workflow & Schema Validation
│
├── docs/                        # Comprehensive System Analysis & Design Docs
│   ├── SRS.md                   # IEEE-830 Software Requirements Specification
│   ├── SYSTEM_DESIGN.md         # Architecture, Modular Design & Security Protocols
│   └── USER_STORIES.md          # Agile Epics, User Stories & Acceptance Criteria
│
├── prototype/                   # Working Interactive Frontend Showcase
│   ├── index.html               # Responsive Live Dashboard Prototype (Tailwind CSS)
│   ├── app.js                   # Interactive client-side triage simulation
│   └── styles.css               # Styling and theme overrides
│
├── LICENSE                      # MIT Open Source License
└── README.md                    # Project Manifesto, Architecture & Diagrams
```

---

## 🚀 6. Running the Interactive Prototype

An interactive web prototype is included in this repository to showcase the core user journeys designed in Figma:

```bash
# Clone the repository
git clone https://github.com/mahamudul-hasan7/NagarAI.git

# Navigate to prototype
cd NagarAI/prototype

# Open directly in your browser
start index.html   # On Windows
# or open with Live Server in VS Code
```

---

## 👨‍💻 Author & Academic Information

- **Student Name**: Mahamudul Hasan
- **Degree**: B.Sc. in Computer Science and Engineering (CSE)
- **Course**: System Analysis and Design (SAD) Lab
- **Academic Term**: Fall 2026
- **Contact**: [mahamud.7info@gmail.com](mailto:mahamud.7info@gmail.com)
- **GitHub**: [@mahamudul-hasan7](https://github.com/mahamudul-hasan7)

---

<p align="center">
  <b>Made with ❤️ for Smarter, Cleaner, and Safer Cities in Bangladesh</b>
</p>
