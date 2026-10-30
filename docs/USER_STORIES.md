# 📋 Agile User Stories & Acceptance Criteria for NagarAI

This document outlines the user personas, functional epics, and atomic user stories following the standard template:  
*“As a [Role], I want to [Action], so that [Business Benefit].”*

---

## 1. User Personas

1. **Persona A: Rafiq (The Daily Commuter / Citizen)**
   - **Age:** 28
   - **Context:** Commutes daily on a motorbike. Regularly encounters hazardous open drainage and road potholes.
   - **Pain Point:** Calling city hotlines takes 30 minutes, with no follow-up or proof of work.

2. **Persona B: Shamim (Ward 15 Municipal Maintenance Officer)**
   - **Age:** 42
   - **Context:** Leads a crew of 12 field sanitation and road repair workers.
   - **Pain Point:** Receives vague, duplicated complaints with incorrect addresses and no priority levels.

3. **Persona C: Sultana Begum (Ward Councilor)**
   - **Age:** 51
   - **Context:** Accountable to over 80,000 ward residents for cleanliness and civic upkeep.
   - **Pain Point:** Lack of real-time visibility into which areas have recurring trash accumulation or waterlogging.

---

## 2. Epics & User Stories

### Epic 1: Quick Incident Reporting
* **US-1.1 (One-Click Photo Reporting):**  
  *As a Citizen, I want to take a quick photo of a broken streetlight inside the app, so that I don't have to type long descriptions while standing on the road.*  
  * **Acceptance Criteria:**
    - Camera launches with minimal click-to-capture latency (< 1s).
    - EXIF GPS location is auto-fetched with an on-screen preview pill.
    - User can attach an optional 15-second audio note.

* **US-1.2 (Bengali Voice Description):**  
  *As a non-technical Citizen, I want to record my problem in Bengali, so that the app understands my complaint without needing typed English.*  
  * **Acceptance Criteria:**
    - Audio is transcribed in real-time or asynchronously via speech-to-text.
    - User can preview and approve the transcription before sending.

---

### Epic 2: AI Triage & Fraud Prevention
* **US-2.1 (Instant Category & Severity Assignment):**  
  *As a Municipal Dispatcher, I want the system to automatically tag whether an issue is "Road Hazard" or "Garbage Spill", so that tickets are routed without manual human reading.*  
  * **Acceptance Criteria:**
    - AI tags category within 3 seconds with confidence percentage.
    - High-risk items (e.g., hanging electric wire) automatically elevate status to `CRITICAL`.

* **US-2.2 (Duplicate Suppression):**  
  *As a Field Inspector, I want the system to merge multiple photos of the same pothole submitted by different citizens, so that my team doesn't receive 10 duplicate work orders.*  
  * **Acceptance Criteria:**
    - Proximity algorithm detects reports within 25m radius submitted within the last 72 hours.
    - Citizen receives notification: *"This issue has already been reported by a neighbor! You are now subscribed to its live updates."*

---

### Epic 3: Resolution & Verification Loop
* **US-3.1 (Before & After Photographic Proof):**  
  *As a Ward Councilor, I want field officers to upload an "After" photo from the exact coordinates, so that fake resolutions are eliminated.*  
  * **Acceptance Criteria:**
    - Officer cannot upload an image from camera roll (must be taken live in-app).
    - Geolocation of the after-photo must match the original report within 30m.

* **US-3.2 (Citizen Verification Rating):**  
  *As a Citizen, I want to rate the quality of the repair (1 to 5 stars) and confirm the issue is fixed, so that my voice ensures true accountability.*  
  * **Acceptance Criteria:**
    - Push notification sent to reporting citizen upon resolution.
    - If rated $\le 2$ stars with reason provided, the ticket re-opens with `AUDIT_REQUIRED` flag.
