# PhishAware Sentinel // SOC Dashboard

A professional-grade Security Operations Center (SOC) dashboard designed to bridge the gap between frontend web development and defensive cybersecurity. This platform simulates realistic phishing campaigns, performs OSINT breach intelligence checks, and analyzes email content for malicious indicators to test and improve user security awareness.

## 🚀 Core Features

* **Targeted Campaign Simulator:** Deploys synthetic phishing scenarios (e.g., Credential Harvesting, Malware Attachments) and tracks user interactions within a sandboxed virtual inbox.
* **OSINT Breach Intelligence:** Queries target email addresses against known public data breaches to identify compromised identities and credential exposures.
* **Heuristic Content Analyzer:** Scans suspicious email bodies for threat indicators, urgency flags, and malicious URLs using heuristic pattern recognition.
* **Executive Metrics Dashboard:** Generates After-Action Reports (AAR) to evaluate target vulnerabilities and recommends specific remediation or security awareness training.

## 🔄 System Workflow & Architecture

The platform operates across three distinct operational modules, each following a specific technical workflow:

### 1. Campaign Simulation Lifecycle
1. **Target Configuration:** The SOC operator inputs the target email address and selects an attack scenario (e.g., Microsoft 365 Password Expiry, HR Policy PDF, IT VPN Update). Each scenario possesses predefined difficulty levels, attack vectors, and spoofed headers.
2. **Payload Deployment:** The system initiates a simulated deployment sequence, mimicking the compilation of payloads, header spoofing, and spam filter evasion.
3. **Target Engagement (Virtual Sandbox):** The perspective shifts to the target's virtual inbox. The simulated email is delivered, complete with sender verification warnings and interactive malicious elements (links or attachments).
4. **Telemetry & Interaction Tracking:** The system actively monitors user behavior in the sandbox. If the user clicks the malicious link or downloads the attachment, the event is logged as a critical vulnerability.
5. **After-Action Report (AAR):** The operator is returned to the SOC dashboard where a comprehensive metrics report is generated. It details delivery status, open rates, payload interaction, and provides immediate remediation recommendations.

### 2. OSINT Breach Intelligence Pipeline
1. **Target Ingestion:** The operator inputs a target identity (email address) into the intelligence module.
2. **Database Querying:** The system initiates a scan against relational databases containing known public data breaches (simulating HaveIBeenPwned API integration).
3. **Threat Correlation:** Data points are cross-referenced to identify if the target's credentials, personal information, or locations were exposed in historical cyber incidents.
4. **Exposure Reporting:** The system outputs a categorized list of breaches, detailing the incident date, the source of the breach (e.g., LinkedIn, Canva), and the specific data types compromised, allowing the operator to assess the target's baseline risk level.

### 3. Heuristic Content Analysis Flow
1. **Content Ingestion:** Suspicious email bodies or raw headers are pasted into the analyzer terminal.
2. **NLP & Pattern Recognition:** The engine runs a heuristic scan utilizing regular expressions and keyword density algorithms to detect common phishing patterns. 
3. **Threat Scoring:** The system assigns a composite risk score based on:
   * **Urgency Triggers:** Language demanding immediate action (e.g., "24 hours", "suspended").
   * **Data Harvesting:** Direct requests for sensitive data (e.g., credentials, SSN).
   * **Embedded Payloads:** Detection of external URLs requiring verification.
4. **Indicator Breakdown:** The output provides a severity-graded list (Medium, High, Critical) of all identified threats, explaining *why* specific language was flagged to aid in analyst training.

## 🛠️ Tech Stack

* **Frontend Framework:** React (bootstrapped with Vite)
* **Styling:** Tailwind CSS (Custom dark-theme SOC aesthetics)
* **UI Components:** Lucide-React icons
* **State Management:** React Hooks (useState, useEffect)

## ⚙️ Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/phishaware-simulator.git](https://github.com/YOUR_USERNAME/phishaware-simulator.git)
   cd phishaware-simulatorInstall dependencies:
Ensure you have Node.js installed, then run:

Bash
npm install
(Note: This project relies on lucide-react for iconography. Ensure it is included in your package.json)

Start the development server:

Bash
npm run dev
Access the platform:
Open your browser and navigate to http://localhost:5173 (or the port specified by Vite).

🎯 Learning Outcomes & Objectives
Built as a practical portfolio piece for a Computer Science & Engineering focus in cybersecurity, this project demonstrates:

Advanced understanding of phishing attack vectors and social engineering techniques.

The ability to build interactive, state-driven user interfaces using modern web frameworks.

Practical application of security concepts (OSINT, threat heuristics, simulated payloads) translated into functional, user-facing web tools.

👨‍💻 Developer
Manoj Venkat Karthik Gadidesi

B.Tech Computer Science & Engineering | Cybersecurity

⚠️ Disclaimer: This tool is built strictly for educational purposes and authorized security awareness simulations. Only launch simulations against assets and personnel you own or have explicit permission to test.
