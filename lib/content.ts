/**
 * ------------------------------------------------------------------
 *  SITE CONTENT — single source of truth.
 *
 *  Every section of the site reads from this file. Update the copy,
 *  timeline, posts and links here and the whole site stays in sync.
 * ------------------------------------------------------------------
 */

export const site = {
  name: "Shubham Vishwakarma",
  monogram: "SV",
  role: "Solution Architect · Cybersecurity & Infrastructure Specialist",
  roleFull:
    "Solution Architect | Presales Engineer | Cybersecurity & Infrastructure Specialist",
  tagline: "Trust, engineered.",
  email: "shubham.vishwakarma5606@gmail.com",
  phone: "+91 70397 56742",
  phoneHref: "tel:+917039756742",
  location: "Mumbai, India",
  timezone: "IST",
  url: "https://cyberseanshubham.netlify.app",
  description:
    "Solution architect and cybersecurity specialist in Mumbai. 5+ years securing BFSI-scale infrastructure — 80,000+ endpoints, 5,000+ servers, 99% uptime — now designing zero-trust architectures and AI-assisted operations.",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/shubham-vishwakarma5606",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shubham-vishwakarma5606",
    },
    { label: "Email", href: "mailto:shubham.vishwakarma5606@gmail.com" },
  ],
    resume: "/Shubham-Vishwakarma-Resume.pdf",
};

export const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Interests", href: "#interests" },
  { label: "Insights", href: "#insights" },
  { label: "Blog", href: "#blog" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  status: "Open to consulting & solutioning engagements",
  headlineA: "Architecting security",
  headlineB: "for an AI-driven world.",
  lead: "I'm Shubham Vishwakarma — a solution architect and cybersecurity specialist from Mumbai. I keep BFSI-scale environments secure and running: 80,000+ endpoints, 5,000+ servers, 99% uptime. Now I design the zero-trust architectures and AI-assisted operations that make that look easy.",
  primaryCta: { label: "Explore my journey", href: "#journey" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  terminalLines: [
    { prompt: "whoami", output: "shubham.vishwakarma :: solution_architect" },
    {
      prompt: "cat ./focus.txt",
      output: "zero-trust · BFSI security ops · AI-assisted reliability",
    },
    {
      prompt: "uptime --career",
      output: "5+ years · 80K endpoints · 99% availability",
    },
    { prompt: "sudo give --access guest", output: "granted. welcome, reader. ▊" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Journey — career timeline                                          */
/* ------------------------------------------------------------------ */

export interface JourneyEntry {
  period: string;
  role: string;
  org: string;
  clients?: string[];
  summary: string;
  tags: string[];
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    period: "2019 — 2021",
    role: "Foundations — B.Sc. Information Technology",
    org: "Dhanukar College of Commerce and Science",
    summary:
      "Built the base layer: networking, Linux, and databases by day; Kali boxes and home labs by night. Started breaking systems long before anyone paid me to defend them — and learned that curiosity is the first control.",
    tags: ["B.Sc. IT", "Linux", "Networking", "Home Labs"],
  },
  {
    period: "2021 — 2024",
    role: "IT Security Engineer",
    org: "Hitachi Systems India — deputed to major BFSI clients",
    clients: [
      "IndusInd Bank",
      "SBM Bank",
      "Mahindra & Mahindra",
      "Axis Mutual Fund",
      "JM Financial",
    ],
    summary:
      "Three years inside India's most regulated infrastructure. Secured 80,000+ endpoints and 5,000+ servers running 24×7 at 99% uptime. Deployed Trellix EDR, DLP and Application Control on-prem; ran SentinelOne EDR/XDR across cloud and on-prem; supported treasury and trading platforms (Bloomberg, Refinitiv, CCIL); automated patching for the enterprise with ManageEngine 360; and led malware investigations, threat hunts and on-call incident response beside SOC and NOC teams.",
    tags: ["EDR/XDR", "PAM", "DLP", "Incident Response", "BFSI", "Automation"],
  },
  {
    period: "2024 — Present",
    role: "Cybersecurity Solutions Architect · Presales",
    org: "BD Software Distribution",
    summary:
      "Now on the architecture side of the table: technical assessments and solution design for BFSI and government clients, presales with customers and partners, and L1/L2 escalation support for enterprise security platforms. Designing one-click ZTNA remote access, validating AI-generated detections before they touch production, and automating deployment health checks in Python and Bash.",
    tags: ["Presales", "Solution Architecture", "ZTNA", "PAM/IAM", "AI-Assisted Ops"],
    current: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Expertise — asymmetric bento grid                                  */
/* ------------------------------------------------------------------ */

export interface ExpertiseCard {
  title: string;
  description: string;
  tags: string[];
  span: string; // grid classes (asymmetric bento)
  icon: string; // lucide icon key, resolved in the section component
  featured?: boolean;
}

export const expertiseIntro =
  "Five years across SOC floors, bank-grade infrastructure, and presales war rooms. My toolkit was built where security meets uptime.";

export const expertise: ExpertiseCard[] = [
  {
    title: "Security Operations & Incident Response",
    description:
      "24×7 operational security at banking scale — threat hunting, malware analysis, and EDR/XDR deployment across tens of thousands of endpoints. Detection engineering, containment runbooks, and the discipline that pulls MTTR down quarter after quarter.",
    tags: ["EDR/XDR", "Threat Hunting", "MTTR"],
    span: "md:col-span-4 md:row-span-2",
    icon: "Siren",
    featured: true,
  },
  {
    title: "Zero-Trust & Presales Solutioning",
    description:
      "Architecting ZTNA remote access, PAM/IAM, MFA and WAF stacks for BFSI and government — sized to the use case, not the catalog.",
    tags: ["ZTNA", "PAM/IAM", "Presales"],
    span: "md:col-span-2",
    icon: "ShieldCheck",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "RHEL, Ubuntu and Windows Server estates; AWS EC2/S3/IAM; cloud migrations and NAS storage — hardened from the landing zone up.",
    tags: ["AWS", "Linux", "Migration"],
    span: "md:col-span-2",
    icon: "Cloud",
  },
  {
    title: "Observability & Monitoring",
    description:
      "SIEM log analysis, platform health dashboards and alert triage systems that surface signal from millions of daily events.",
    tags: ["SIEM", "Dashboards", "Triage"],
    span: "md:col-span-2",
    icon: "Activity",
  },
  {
    title: "Vulnerability & Compliance",
    description:
      "Vulnerability management and reporting inside strict regulatory frameworks — ITIL change control, audits, and post-incident reviews.",
    tags: ["ITIL", "Audits", "BFSI Compliance"],
    span: "md:col-span-2",
    icon: "Scale",
  },
  {
    title: "Automation & AI-Assisted Ops",
    description:
      "Python, Bash and JavaScript automation for health checks, patch orchestration and API integrations — with AI doing the first draft and humans signing every change.",
    tags: ["Python", "Bash", "AI Ops"],
    span: "md:col-span-2",
    icon: "BrainCircuit",
  },
];

/* ------------------------------------------------------------------ */
/*  Projects — GitHub repositories                                     */
/* ------------------------------------------------------------------ */

export interface Project {
  name: string;
  repo: string; // repo name on GitHub
  description: string;
  language: string;
  langColor: string; // dot color
  tags: string[];
  url: string;
  featured?: boolean;
}

export const projectsIntro =
  "Defensive tooling, blue-team labs and experiments — built client-side, shipped from a terminal. Every card links straight to its repository.";

export const projects: Project[] = [
  {
    name: "Sentinel Suite",
    repo: "Deftools",
    description:
      "Four genuinely working defensive tools in one client-side web app: a password auditor with entropy, crack-time math and a live HIBP k-anonymity breach check; phishing-URL forensics across 15 weighted heuristics; a mini-SIEM log hunter that classifies brute-force and web-scanner behavior into a downloadable incident report; and a crypto bench with codecs, single-byte XOR solving, hash identification and JWT decoding with alg-confusion warnings. No server, no storage — nothing leaves the browser.",
    language: "JavaScript",
    langColor: "#f1e05a",
    tags: ["HIBP", "Mini-SIEM", "URL Forensics", "Crypto Bench"],
    url: "https://github.com/shubham-vishwakarma5606/Deftools",
    featured: true,
  },
  {
    name: "Nightgrid",
    repo: "Nightgrid",
    description:
      "A cinematic, 100% fictional dark-ops console — mesh node grid, telemetry bus, and a sealed shell where every dangerous verb answers [SIM LOCKED] — paired with a RAT-Hunter blue-team lab: RAT anatomy walkthroughs mapped to defender countermeasures and copy-ready Sigma detection rules.",
    language: "JavaScript",
    langColor: "#f1e05a",
    tags: ["Sigma Rules", "Blue Team", "Simulation"],
    url: "https://github.com/shubham-vishwakarma5606/Nightgrid",
    featured: true,
  },
  {
    name: "Kavach360",
    repo: "Kavach360",
    description:
      "Cybersecurity awareness, training and simulation platform — built to turn security policy into drills people actually remember.",
    language: "HTML",
    langColor: "#e34c26",
    tags: ["Awareness", "Training", "Simulation"],
    url: "https://github.com/shubham-vishwakarma5606/Kavach360",
  },
  {
    name: "CyberS3an Remote Access",
    repo: "CyberS3anRemoteAccess",
    description:
      "Web-based secure remote-access workflow — one-click browser access to business applications, in the spirit of TSplus-style ZTNA delivery.",
    language: "HTML",
    langColor: "#e34c26",
    tags: ["Remote Access", "ZTNA"],
    url: "https://github.com/shubham-vishwakarma5606/CyberS3anRemoteAccess",
  },
  {
    name: "CyberSean Portfolio v1",
    repo: "CyberS3an_porfolio",
    description:
      "The first iteration of my personal site — where the current design language started. Kept online for archaeology.",
    language: "HTML",
    langColor: "#e34c26",
    tags: ["Portfolio", "v1"],
    url: "https://github.com/shubham-vishwakarma5606/CyberS3an_porfolio",
  },
  {
    name: "This Website",
    repo: "Website",
    description:
      "The site you're reading — Linear-style dark design, boot animation, static Next.js export with zero runtime dependencies.",
    language: "TypeScript",
    langColor: "#3178c6",
    tags: ["Next.js", "Tailwind v4", "Framer Motion"],
    url: "https://github.com/shubham-vishwakarma5606/Website",
  },
];

export const githubProfile = "https://github.com/shubham-vishwakarma5606";

/* ------------------------------------------------------------------ */
/*  Interests                                                          */
/* ------------------------------------------------------------------ */

export interface Interest {
  title: string;
  description: string;
  icon: string;
}

export const interestsIntro =
  "The work doesn't switch off at 6 PM — it just changes shape. These are the rabbit holes that keep me sharp.";

export const interests: Interest[] = [
  {
    title: "CTF & Blue-Team Labs",
    description:
      "Weekend capture-the-flag and detection labs. Breaking things on purpose is still the fastest way to learn how they fail.",
    icon: "Flag",
  },
  {
    title: "Homelab & Self-Hosting",
    description:
      "A rack of machines running segmented VLANs, a SIEM watching my own network, and absolutely no trust in my own IoT devices.",
    icon: "Server",
  },
  {
    title: "Building Security Tools",
    description:
      "Shipping client-side defensive tools — Sigma rule labs, log hunters, breach-check benches. If it helps a defender, I'll build it.",
    icon: "Wrench",
  },
  {
    title: "Writing & Speaking",
    description:
      "Security should be legible to everyone it protects. I write and speak to close the gap between the boardroom and the terminal.",
    icon: "Mic",
  },
  {
    title: "AI-Assisted Operations",
    description:
      "Probing where LLMs genuinely help operations — log triage, detection drafts, runbook synthesis — and where they must never be trusted.",
    icon: "BrainCircuit",
  },
  {
    title: "Trekking & Photography",
    description:
      "The best debugging happens offline. Sahyadri trails, a mirrorless camera, and no signal — the original air gap.",
    icon: "Mountain",
  },
];

/* ------------------------------------------------------------------ */
/*  Insights — numbers, principles, credentials, domains               */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 5, suffix: "+", label: "Years in security & infra" },
  { value: 80, suffix: "K+", label: "Endpoints secured" },
  { value: 5, suffix: "K+", label: "Servers supported" },
  { value: 99, suffix: "%", label: "Uptime sustained" },
];

export const principles = [
  {
    title: "Uptime is a security property.",
    body: "An unavailable system is a compromised promise. Availability, integrity, confidentiality — in that order of user pain.",
  },
  {
    title: "Reduce MTTR before chasing zero CVEs.",
    body: "You'll never patch everything. A rehearsed response beats a perfect inventory every single time.",
  },
  {
    title: "AI drafts. Humans sign.",
    body: "Every AI-generated recommendation gets validated before it touches production. Speed with a review gate, not a leap of faith.",
  },
  {
    title: "Change control is not bureaucracy.",
    body: "It's the blast-radius limiter. The discipline you resent on a calm Tuesday is the reason Friday isn't a headline.",
  },
];

export const certifications = [
  { name: "CCSP", detail: "Certified Cloud Security Professional" },
  { name: "CISM", detail: "Certified Information Security Manager" },
  { name: "CEH", detail: "Certified Ethical Hacker" },
  { name: "Security+", detail: "CompTIA Security Operations" },
  { name: "Network+", detail: "CompTIA Networking Fundamentals" },
  { name: "SRE", detail: "Site Reliability Engineering" },
  { name: "Bitdefender Tech", detail: "Certified Technical Specialist" },
  { name: "Bitdefender Sales", detail: "Certified Sales Specialist" },
  { name: "TSplus Expert", detail: "Business Solution Certification" },
];

export const domains = [
  "Zero Trust / ZTNA",
  "EDR / XDR",
  "SIEM & Detection",
  "PAM / IAM",
  "Incident Response",
  "Threat Hunting",
  "DLP",
  "WAF",
  "MDM",
  "Cloud (AWS)",
  "Kubernetes",
  "Vulnerability Mgmt",
  "ITIL & SRE",
  "Python & Bash",
  "AI-Assisted Ops",
  "BFSI Compliance",
];

/* ------------------------------------------------------------------ */
/*  Blog                                                               */
/* ------------------------------------------------------------------ */

export type PostBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  body: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "securing-llm-applications-field-guide",
    title: "Securing LLM Applications: A Field Guide",
    excerpt:
      "Your model is not the perimeter — it's the attack surface. A practical control map for prompt injection, tool abuse, and data exfiltration in production AI systems.",
    category: "AI Security",
    date: "Jul 12, 2026",
    readTime: "11 min read",
    featured: true,
    body: [
      {
        kind: "paragraph",
        text: "Every team shipping an LLM feature right now is running the same experiment: what happens when you connect a system that can't tell instructions from data to your most sensitive data? The honest answer is that nobody fully knows. But we know enough to build defensible systems — if we stop treating the model as a trusted component.",
      },
      {
        kind: "paragraph",
        text: "The single most important mindset shift is this: model output is untrusted code. It should be handled with the same suspicion as user input, because to an attacker it effectively is user input — just delivered through a stranger on the internet, a poisoned PDF, or a hijacked RAG document.",
      },
      { kind: "heading", text: "The threat model that matters" },
      {
        kind: "paragraph",
        text: "Most LLM incidents fall into three buckets. Direct prompt injection, where the attacker talks to the model. Indirect prompt injection, where the attacker leaves instructions in content the model will read — an email, a web page, a support ticket. And over-privileged agency, where the model itself does something harmful because the tools it controls were too powerful.",
      },
      {
        kind: "list",
        items: [
          "Direct injection → jailbreaks, policy bypass, persona manipulation.",
          "Indirect injection → instructions hidden in retrieved content, executed by your agent with your credentials.",
          "Tool abuse → the model's read-only assistant quietly holds write access to production systems.",
          "Memory and context exfiltration → long-term agent memory becomes a slow, patient data leak.",
        ],
      },
      { kind: "heading", text: "Controls that survive contact" },
      {
        kind: "paragraph",
        text: "Start with tool scopes, not the prompt. Every tool an agent can call should be least-privilege, read-only by default, and scoped to a single tenant or dataset. If the agent can issue refunds, cap the amount. If it can send email, approve drafts before they leave. Irreversible actions get a human in the loop — no exceptions for \"the model is usually right.\"",
      },
      {
        kind: "paragraph",
        text: "Treat retrieved content as hostile. Strip or sandbox instructions embedded in RAG documents, sign internal knowledge sources, and log provenance for every piece of context the model consumes. When something goes wrong — and it will — you want to replay exactly which document poisoned the session.",
      },
      {
        kind: "quote",
        text: "You wouldn't give an intern production database credentials on day one. Stop giving them to a stochastic parrot with a REST client.",
      },
      { kind: "heading", text: "Detection beats prevention" },
      {
        kind: "paragraph",
        text: "Prompt filters help, but they are rate limits, not firewalls. The mature posture is detection-first: capture full agent traces, alert on anomalous tool-call patterns (sudden reads across tenants, bulk exports, new destinations), and red-team your own assistant quarterly. Build the kill switch before you need it — one flag that returns every agent to read-only mode.",
      },
      {
        kind: "paragraph",
        text: "None of this says \"don't ship AI.\" It says ship it like you'd ship any other privileged system: small blast radius, deep logging, rehearsed response. The teams that get LLM security right aren't the ones with the cleverest prompts — they're the ones who never trusted the prompt in the first place.",
      },
    ],
  },
  {
    slug: "80000-endpoints-lessons-incident-response",
    title: "What 80,000 Endpoints Taught Me About Incident Response",
    excerpt:
      "Three years inside banking infrastructure — where a missed Tuesday alert is a headline by Friday. Field notes on triage at scale, telemetry hygiene, and why MTTR is a culture metric.",
    category: "Security Operations",
    date: "Jun 21, 2026",
    readTime: "10 min read",
    body: [
      {
        kind: "paragraph",
        text: "The first thing scale teaches you is that the mathematics of detection changes. At eighty thousand endpoints, \"alert on everything\" isn't a strategy — it's a denial-of-service attack on your own analysts. A one-in-a-million false positive rate isn't excellence; it's eighty tickets a week of nothing, teaching your queue that crying wolf is normal.",
      },
      { kind: "heading", text: "Triage is queue theory, not heroics" },
      {
        kind: "paragraph",
        text: "The SOC mythologizes the 3 AM save. The reality is queue physics: severity has to mean potential blast radius multiplied by confidence, or your best analyst spends their shift on a misconfigured printer. We rebuilt our runbooks around three questions — can it spread, can it steal, can we contain it from here — and mean time to triage fell by more than half. The tools didn't change. The questions did.",
      },
      { kind: "heading", text: "Telemetry hygiene beats tool budget" },
      {
        kind: "paragraph",
        text: "Every large estate lies about its coverage. The dashboard says 97% of agents healthy; nobody asks which 3% — until the investigation lands on a server that's been blind for six months, sitting quietly inside the payment VLAN. My least glamorous, most valuable ritual was the daily agent-health report: a broken sensor isn't a neutral gap, it's an invisible breach tunnel with an asset tag.",
      },
      {
        kind: "list",
        items: [
          "Kill-switch runbooks → pre-written containment commands, peer-reviewed, executable in under five minutes.",
          "Credential rotation drills → not documented, drilled. The first time you rotate a service account shouldn't be during a breach.",
          "Compliance-pre-approved comms → in BFSI, the template for regulator notification exists before the incident does.",
          "Patch windows negotiated in advance → emergency change authority agreed with the business before the CVE drops, not after.",
        ],
      },
      {
        kind: "quote",
        text: "In a bank, you don't do incident response during an incident. You did it in the six months before — the incident just grades your homework.",
      },
      { kind: "heading", text: "MTTR is a culture metric" },
      {
        kind: "paragraph",
        text: "You can't dashboard your way to fast recovery. What moves MTTR is boring cultural machinery: blameless post-incident reviews where people tell the truth about what they clicked; SOC and NOC sharing a vocabulary instead of an escalation form; on-call that pages a named human instead of a distribution list. The best incident teams I've worked with weren't the ones with the most tooling — they were the ones where \"I don't know, but I'll find out in five minutes\" was an acceptable sentence.",
      },
      {
        kind: "paragraph",
        text: "Scale doesn't make you paranoid. It makes you precise. You learn that security operations at banking scale is mostly inventory — of assets, of alerts, of your own unknowns — and that the humble spreadsheet of \"things we can't currently see\" is the most dangerous document you own. Guard it well.",
      },
    ],
  },
  {
    slug: "zero-trust-isnt-a-product",
    title: "Zero Trust Isn't a Product, It's an Architecture Decision",
    excerpt:
      "Vendors sell it in boxes, but zero trust is a series of decisions about identity, containment, and verification. Here's the maturity path that actually works.",
    category: "Architecture",
    date: "May 30, 2026",
    readTime: "8 min read",
    body: [
      {
        kind: "paragraph",
        text: "Somewhere along the way, \"zero trust\" became something you could buy. A platform, an appliance, a SKU with a catchy name. But zero trust was never a product — it's a set of architectural decisions about what you're willing to assume, and the most important one is right in the name: nothing.",
      },
      {
        kind: "paragraph",
        text: "The mistake I see most often is starting with the vendor evaluation instead of the crown jewels. Before any tooling conversation, you need one uncomfortable workshop: what are the five things that would genuinely end the business if they leaked or burned, and who — precisely — can reach them today? For most organizations, the answer is \"far more identities than anyone expected.\"",
      },
      { kind: "heading", text: "The three decisions that define you" },
      {
        kind: "list",
        items: [
          "Identity is the perimeter → every request authenticated, authorized, and encrypted, regardless of network location. The VPN tunnel is not a trust signal.",
          "Least privilege is temporal → access granted just-in-time, scoped to a task, and revoked by default. Standing admin is a liability you carry for no reason.",
          "Assume breach → segment so that one compromised laptop is an incident, not a headline. Design for containment, test the blast radius.",
        ],
      },
      {
        kind: "quote",
        text: "The goal isn't a network where nothing is trusted. It's a network where trust is explicit, short-lived, and continuously re-earned.",
      },
      { kind: "heading", text: "A maturity path, not a moon landing" },
      {
        kind: "paragraph",
        text: "Winning zero-trust programs I've built follow the same shape. Phase one is visibility — exhaustive identity and asset inventory, because you cannot segment what you cannot see. Phase two is identity hardening — phishing-resistant MFA everywhere, kill shared accounts, consolidate identity providers. Phase three is segmentation — start at the crown jewels and work outward, one micro-perimeter at a time. Phase four is continuous verification — device posture, behavioral signals, policy engines that re-evaluate every session.",
      },
      {
        kind: "paragraph",
        text: "Each phase delivers value on its own, which is deliberate: if your zero-trust roadmap only pays off at the end, it will never arrive. And notice what's missing from phases one through three — a purchase order. Pick tools last, once the decisions are made. Architecture is the decisions. The products are just where the decisions live.",
      },
    ],
  },
  {
    slug: "silent-risk-in-your-cicd-pipeline",
    title: "The Silent Risk in Your CI/CD Pipeline",
    excerpt:
      "Your pipeline has production credentials, runs untrusted code, and nobody treats it as production. Supply-chain attackers noticed years ago.",
    category: "DevSecOps",
    date: "Apr 18, 2026",
    readTime: "9 min read",
    body: [
      {
        kind: "paragraph",
        text: "Here's a fun exercise: list every system in your organization that holds production credentials, executes arbitrary code from the internet, and has almost no security monitoring. If your list is one item long, congratulations — you've found your CI/CD pipeline, the most privileged unmonitored system you own.",
      },
      {
        kind: "paragraph",
        text: "SolarWinds, Codecov, the xz-utils backdoor — supply-chain attackers figured out years ago that compromising the build system is cheaper than compromising the product. One poisoned pipeline signs itself into every artifact you ship. Your WAF never sees it, because the attack arrives through your own deployment process wearing your own signature.",
      },
      { kind: "heading", text: "Where pipelines actually bleed" },
      {
        kind: "list",
        items: [
          "Secrets sprawl → tokens in environment variables, readable by every step, every contributor, every log file.",
          "Over-broad deploy credentials → the pipeline role that can do anything, forever, from anywhere.",
          "Unpinned dependencies → a version range is a standing invitation; a tag can be moved by whoever owns the repo.",
          "Ephemeral runner hygiene → build machines reused across jobs, leaking caches and credentials between teams.",
          "No artifact provenance → you can't prove what source a binary came from, so you can't prove it came from yours.",
        ],
      },
      {
        kind: "quote",
        text: "You review every line of code that goes into the product. Who reviews the machine that builds it?",
      },
      { kind: "heading", text: "A hardening checklist that fits in a sprint" },
      {
        kind: "paragraph",
        text: "First: pin everything. Actions and base images by digest, dependencies by lockfile with integrity hashes. Moving tags are the upstream attacker's best friend. Second: short-lived credentials. OIDC federation from the pipeline to the cloud provider — no stored cloud keys at all. If your pipeline's AWS access key is older than your intern, that's the risk talking.",
      },
      {
        kind: "paragraph",
        text: "Third: sign and attest. Sigstore or equivalent so every artifact carries provenance — which repo, which commit, which workflow — and your deploy gates verify it. Fourth: treat the pipeline as production. Branch protection on workflow files, CODEOWNERS for build config, monitoring on deploy-time behavior, and the humble but devastating control nobody does: alert when a pipeline step touches a network destination it never touched before.",
      },
      {
        kind: "paragraph",
        text: "None of this stops a nation-state on its own. But it converts your pipeline from a silent, credentialed, invisible system into a noisy, least-privilege, observable one — and in security, noisy and observable is most of the battle.",
      },
    ],
  },
  {
    slug: "threat-modeling-for-fast-teams",
    title: "Threat Modeling for Teams That Ship Fast",
    excerpt:
      "Threat modeling has a reputation for 90-page documents and month-long workshops. Here's the 60-minute version that actually survives a sprint.",
    category: "Engineering Culture",
    date: "Feb 27, 2026",
    readTime: "7 min read",
    body: [
      {
        kind: "paragraph",
        text: "Security teams complain that engineering won't do threat modeling. Engineering teams complain that threat modeling is a bureaucratic ritual that produces a document nobody reads. Both are right, and the fix is the same: make it smaller.",
      },
      {
        kind: "paragraph",
        text: "The goal of threat modeling was never the document. It's the sixty minutes where the people who built the system sit together and ask \"how would I break this?\" — while the design can still change. Everything else is paperwork. So keep the sixty minutes and throw away the rest.",
      },
      { kind: "heading", text: "The four questions that do the work" },
      {
        kind: "list",
        items: [
          "What are we building? → one data-flow diagram, drawn live, boxes and arrows only. If it takes more than 10 minutes, the design is too complicated to secure anyway.",
          "What can go wrong? → walk each trust boundary with STRIDE as a prompt, not a religion. Spoofing at the login flow, tampering at the queue, information disclosure at the error handler.",
          "What are we doing about it? → every threat gets one of three fates: fixed in this design, ticketed with an owner, or consciously accepted and written down.",
          "Did we do a good job? → 5 minutes. What did we miss, what assumption scared us most, what would we test first?",
        ],
      },
      {
        kind: "quote",
        text: "A threat model that fits on one page and ships with the design doc beats a perfect one that arrives after the code freeze.",
      },
      { kind: "heading", text: "Make it a design review, not an audit" },
      {
        kind: "paragraph",
        text: "The structural trick is to attach threat modeling to something that already exists: the design review. Any change that crosses a trust boundary — new external integration, new data store, new admin capability — gets a 60-minute session before the first sprint, not a security review after the last one. The security engineer's job in the room is facilitation, not interrogation: the best threats are found by the engineer who says \"wait, actually, that's not how the queue retries work.\"",
      },
      {
        kind: "paragraph",
        text: "Track outcomes in the same place as the work — tickets, not a separate security JIRA graveyard. Review accepted risks quarterly, because context decays. And celebrate the finds: when a team catches a broken assumption in design phase, that's a production incident that never happened. Ship fast teams don't skip security — they just refuse to let it be slow. Sixty minutes is the compromise that isn't one.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev?: Post;
  next?: Post;
} {
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : undefined,
    next: idx < posts.length - 1 ? posts[idx + 1] : undefined,
  };
}
