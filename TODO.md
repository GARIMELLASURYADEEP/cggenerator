# TODO: Tech Certificate Generator Project

## Project Overview
Building a full-stack Tech Certificate Generator with React frontend, FastAPI backend, and MongoDB based on the SRD.

## Steps

### 1. Project Structure Setup
- [x] Create /backend directory and initial files (requirements.txt, .env, database.py, models.py, main.py)
- [x] Create /frontend directory and initial files (package.json, tailwind.config.js, src/index.js, src/App.js, etc.)

### 2. Backend Implementation
- [x] Set up MongoDB connection in database.py
- [x] Define Pydantic models in models.py (Certificate model with validation)
- [x] Implement API endpoints in main.py (POST /api/certificates, GET /api/certificates, GET /api/certificates/{id})
- [x] Add unique certificate ID generation (CERT + 8-digit number with collision check)
- [x] Configure CORS and environment variables
- [ ] Install backend dependencies (pip install -r backend/requirements.txt)

### 3. Frontend Implementation
- [x] Set up React app structure with React Router
- [x] Install frontend dependencies (npm install in /frontend)
- [x] Create Homepage component for domain selection (5 CS domains with gradients and icons)
- [x] Create UserForm component with validation and API submission
- [x] Create CertificatePage component with template and html2canvas download
- [x] Implement localStorage for domain and certificate data persistence
- [x] Add Tailwind CSS and Shadcn UI setup
- [x] Configure domain-specific styling (gradients, icons from Lucide React)

### 4. Integration and Features
- [x] Add form validation (frontend and backend)
- [x] Implement navigation flow (Homepage → Form → Certificate)
- [x] Ensure responsive design (mobile-first)
- [x] Add loading states and error handling

### 5. Testing and Verification
- [x] Run backend server (uvicorn) and test API endpoints
- [x] Run frontend (npm start) and verify functionality
- [ ] Test certificate generation and PNG download
- [ ] Verify database storage and retrieval
- [ ] Check responsiveness and performance

### 6. Finalization
- [ ] Update TODO.md as steps complete
- [ ] Ensure all SRD requirements met (unique IDs, validation, etc.)
- [ ] Prepare for deployment considerations

### 7. Certificate Layout Update
- [x] Remove domainGradients object and related logic in CertificatePage.js
- [x] Update overall color scheme to navy blue, white, gold using Tailwind classes
- [x] Modify header: "Certificate of Achievement" with serif font, gold underline
- [x] Enhance recipient name: text-5xl, bold, gold color, centered
- [x] Update description: New text with recognition of performance, navy text, sans-serif
- [x] Style details grid: Gold labels, navy values
- [x] Improve signatures: Add "Issued on [date]" below, gold lines
- [x] Add border: Gold 4-8px border around certificate div
- [x] Add background: Light navy radial gradient, subtle watermark via CSS
- [x] Add seal: Circular gold element in bottom-right with "Certified" text
- [x] Ensure html2canvas compatibility and test rendering/download

### 8. Advanced Certificate Layout Update (A4 Landscape Print-Optimized)
- [x] Add Google Fonts link to public/index.html ('Dancing Script' for name, 'Playfair Display' for title)
- [x] Update CertificatePage.js dimensions to A4 landscape (1123x794px)
- [x] Add thick navy border (border-8 border-navy-900) around certificate div
- [x] Add gold ribbon banner at top-center with clip-path for unique shape (bg-gold-500, navy text "Certificate of Excellence")
- [x] Update title to "Certificate of Excellence" (bold gold, Playfair Display serif)
- [x] Recipient name: Extra-large (text-7xl), Dancing Script font, gold color, centered
- [x] Update description: "This certificate is proudly presented to [name] for outstanding achievement in [domain]", navy text, sans-serif, centered
- [x] Details grid: Gold labels, navy values for ID and Issue Date
- [x] Signatures: Bottom, two gold-bordered lines for "Director" and "Instructor", separate "Date of Issuance: [issue_date]" line in navy
- [x] Gold seal near signatures (bottom-right, circular gradient bg-gold-400 to gold-600, border-gold-700, "SEAL" text navy bold)
- [x] Subtle navy watermark background (radial-gradient overlay low opacity)
- [x] Add print button next to download (window.print(), styled navy)
- [x] Add @media print CSS for A4 landscape (no shadows, full scale, 0 margins) via <style> tag in component
- [x] Ensure html2canvas captures print-optimized layout; test rendering, PNG download, print preview

Progress will be updated after each completed step.
