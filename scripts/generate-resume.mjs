/**
 * Generates public/Shubham-Vishwakarma-Resume.pdf from structured data.
 * Usage: npm run resume   (requires pdfkit dev dependency)
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "Shubham-Vishwakarma-Resume.pdf");

const ACCENT = "#5E6AD2";
const INK = "#1a1a1e";
const MUTED = "#5a5f6b";
const RULE = "#d9dbe3";

const data = {
  name: "SHUBHAM VISHWAKARMA",
  title: "Solution Architect | Presales Engineer | Cybersecurity & Infrastructure Specialist",
  contact: [
    "Mumbai, India",
    "+91 70397 56742",
    "shubham.vishwakarma5606@gmail.com",
    "linkedin.com/in/shubham-vishwakarma5606",
    "cyberseanshubham.netlify.app",
  ],
  summary:
    "Results-driven IT professional with 5+ years of experience in large-scale enterprise infrastructure support, incident response, and operational reliability within highly regulated BFSI environments. Proven record of securing and supporting environments with 80,000+ endpoints and 5,000+ servers, sustaining 99% uptime under strict regulatory compliance. Skilled in Python, Bash and JavaScript automation, observability tooling, and AI-assisted operational workflows. Committed to reducing MTTR, enforcing change-control discipline, and driving measurable reliability outcomes.",
  experience: [
    {
      role: "Cybersecurity Solutions Architect | IT Security Engineer | Technical Pre-Sales",
      org: "BD Software Distribution Pvt. Ltd. — Mumbai, India",
      period: "2024 — Present",
      points: [
        "L1/L2 technical support, health checks and incident resolution for enterprise security platforms across critical customer environments.",
        "AI-driven operations: analyze security logs and automate threat-detection workflows with enterprise AI, rigorously validating AI-generated recommendations before implementation under strict data-sensitivity protocols.",
        "Python/Bash automation for deployment validations, routine health checks and operational workflows, measurably improving efficiency.",
        "SIEM dashboards and native telemetry to triage logs, metrics and traces for proactive issue detection.",
        "Technical infrastructure assessments for BFSI and government clients; scalable, AI-powered security and reliability recommendations aligned to business continuity.",
        "Led presales with customers and partners; solutioning for secure one-click remote access to business applications (ZTNA).",
        "Product expertise: TSplus, Crossware, GoldFish, Bitdefender GravityZone, Email Security, MDM, FIM, Risk Management, Attack Surface Management, Axidian (PAM/IAM), WAF, MFA, FileCloud, Zaperon (ZTNA).",
      ],
    },
    {
      role: "IT Security Engineer (Deputed to Major BFSI Clients)",
      org: "Hitachi Systems India Pvt. Ltd. — Mumbai, India",
      period: "September 2021 — December 2024",
      clients: "IndusInd Bank · State Bank of Mauritius (SBM) · Mahindra & Mahindra · Axis Mutual Fund · JM Financial",
      points: [
        "Supported and secured an enterprise estate of 80,000+ endpoints and 5,000+ servers through rigorous 24x7 operations, ensuring high availability for mission-critical banking infrastructure.",
        "Led incident response, malware investigations and threat hunting with SOC, NOC and infrastructure teams, directly improving MTTR.",
        "Administered Trellix Endpoint Security, EDR, DLP, Application Control and PAM; performed continuous health checks, assessments and policy management for strict regulatory compliance.",
        "Deployed Trellix EDR and Application Control on-premises and integrated them into existing infrastructure.",
        "Managed Active Directory, AirWatch MDM, Windows Servers and NAS storage at SBM Bank; supported treasury and trading platforms (Bloomberg, Refinitiv, CCIL) with full business continuity.",
        "Automated patch management and compliance auditing across the enterprise with ManageEngine 360; automated trading-ticket workflows in Bash and Python.",
        "Optimized SentinelOne EDR/XDR across on-prem and cloud at Mahindra & Mahindra; led cloud migration and security health assessments; assisted SOC with Sentinel data-lake queries.",
        "Administered Symantec Endpoint Protection and SentinelOne cloud platforms under the CISO team at Axis Mutual Fund and JM Financial.",
      ],
    },
  ],
  skills: [
    ["Infrastructure & Cloud", "Red Hat Linux, Ubuntu, Kali Linux, Windows Server, AWS (EC2, S3, IAM), Cloud Migration, NAS Storage"],
    ["Observability & Monitoring", "SIEM Log Analysis, ManageEngine Desktop Central & 360, Trend Micro Deep Security, SentinelOne, Platform Health Monitoring, Alert Triage"],
    ["Scripting & Automation", "Python, Bash/Shell, JavaScript, vulnerability reporting, API integrations, task orchestration"],
    ["Security & Operations", "Incident Response, Threat Hunting, Malware Analysis, Vulnerability Management, PAM/IAM, ZTNA, DLP, WAF, EDR/XDR (Trellix, Bitdefender, SentinelOne), MDM (AirWatch)"],
    ["Databases & Applications", "Bloomberg, Refinitiv, CCIL trading platforms; working knowledge of PostgreSQL and Oracle"],
    ["Networking & Tools", "TCP/IP, DNS, Wireshark, Nmap, Zscaler, FortiClient"],
    ["ITSM & Reliability", "24/7 On-Call, ITIL, Change Control, Root Cause Analysis, MTTR Optimization, Post-Incident Reviews"],
    ["Emerging", "Kubernetes, Docker, Enterprise AI-Assisted Operations"],
  ],
  certifications: [
    "CCSP — Certified Cloud Security Professional (Simplilearn)",
    "CISM — Certified Information Security Manager (Simplilearn)",
    "CompTIA Security+ — Security Operations (Simplilearn)",
    "CompTIA Network+ — Networking Fundamentals (Simplilearn)",
    "CEH — Certified Ethical Hacker (Simplilearn)",
    "Site Reliability Engineering (Simplilearn)",
    "Bitdefender Certified Technical Specialist",
    "Bitdefender Certified Sales Specialist",
    "Certified Expert — TSplus Business Solution",
  ],
  education: {
    degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
    school: "Dhanukar College of Commerce and Science",
    period: "2021 · CGPA 6.9",
  },
};

const doc = new PDFDocument({ size: "A4", margins: { top: 54, bottom: 54, left: 56, right: 56 } });
doc.pipe(fs.createWriteStream(outPath));

const pageWidth = doc.page.width - 56 * 2;

function section(title) {
  doc.moveDown(0.9);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(ACCENT).text(title.toUpperCase(), { characterSpacing: 1.6 });
  const y = doc.y + 2;
  doc.moveTo(56, y).lineTo(56 + pageWidth, y).lineWidth(0.8).strokeColor(RULE).stroke();
  doc.moveDown(0.35);
}

function body(text, opts = {}) {
  doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(text, { width: pageWidth, lineGap: 1.8, ...opts });
}

function bullet(text) {
  const y = doc.y;
  doc.font("Helvetica").fontSize(9.5).fillColor(ACCENT).text("•", 56, y, { continued: false });
  doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(text, 68, y, { width: pageWidth - 12, lineGap: 1.6 });
  doc.x = 56;
  doc.moveDown(0.28);
}

doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text(data.name, { characterSpacing: 1.2 });
doc.moveDown(0.15);
doc.font("Helvetica").fontSize(10.5).fillColor(ACCENT).text(data.title);
doc.moveDown(0.45);
doc.font("Helvetica").fontSize(8.5).fillColor(MUTED).text(data.contact.join("   ·   "));
doc.moveDown(0.4);
{ const y = doc.y; doc.moveTo(56, y).lineTo(56 + pageWidth, y).lineWidth(1.6).strokeColor(ACCENT).stroke(); }

section("Professional Summary");
body(data.summary);

section("Professional Experience");
for (const job of data.experience) {
  doc.moveDown(0.25);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text(job.role, { width: pageWidth });
  const roleBottom = doc.y;
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(ACCENT).text(job.period.toUpperCase(), 56, roleBottom + 1, { characterSpacing: 0.8 });
  doc.moveDown(0.05);
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(job.org);
  if (job.clients) doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(MUTED).text(job.clients);
  doc.moveDown(0.35);
  job.points.forEach(bullet);
  doc.moveDown(0.15);
}

section("Technical Skills");
for (const [label, items] of data.skills) {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(label, 56, y, { width: 150 });
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(items, 214, y, { width: pageWidth - 158, lineGap: 1.5 });
  doc.x = 56;
  doc.moveDown(0.4);
}

section("Certifications");
{
  const colW = (pageWidth - 16) / 2;
  let col = 0;
  let rowY = doc.y;
  data.certifications.forEach((cert, i) => {
    const x = 56 + (i % 2) * (colW + 16);
    if (i % 2 === 0 && i > 0) rowY = doc.y;
    doc.font("Helvetica").fontSize(9).fillColor(INK).text(cert, x, rowY, { width: colW, lineGap: 1.2 });
    col = (i + 1) % 2;
    if (col === 0) doc.moveDown(0.15);
  });
}

section("Education");
doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(data.education.degree);
doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(`${data.education.school}  ·  ${data.education.period}`);

doc.moveDown(1.2);
{
  const y = doc.y;
  doc.moveTo(56, y).lineTo(56 + pageWidth, y).lineWidth(0.8).strokeColor(RULE).stroke();
  doc.font("Helvetica").fontSize(7.5).fillColor(MUTED).text("Shubham Vishwakarma — Résumé · generated from cyberseanshubham.netlify.app", 56, y + 6, { width: pageWidth, align: "center" });
}

doc.end();
console.log(`wrote ${outPath}`);