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
  role: "Cybersecurity Consultant · Solution Architect",
  tagline: "Trust, engineered.",
  email: "hello@shubhamvishwakarma.com",
  location: "Mumbai, India",
  timezone: "IST",
  url: "https://shubhamvishwakarma.com",
  description:
    "Personal site of Shubham Vishwakarma — cybersecurity consultant and solution architect designing zero-trust systems, securing AI pipelines, and helping teams ship fast without breaking trust.",
  socials: [
    { label: "GitHub", href: "https://github.com/shubham-vishwakarma5606" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shubham-vishwakarma" },
    { label: "X / Twitter", href: "https://x.com/shubhamvsec" },
  ],
};

export const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Expertise", href: "#expertise" },
  { label: "Interests", href: "#interests" },
  { label: "Insights", href: "#insights" },
  { label: "Blog", href: "#blog" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  status: "Available for consulting engagements",
  headlineA: "Architecting security",
  headlineB: "for an AI-driven world.",
  lead: "I'm Shubham Vishwakarma — a cybersecurity consultant and solution architect. I design zero-trust systems, secure AI and data pipelines, and help engineering teams move fast without breaking trust.",
  primaryCta: { label: "Explore my journey", href: "#journey" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  terminalLines: [
    { prompt: "whoami", output: "shubham.vishwakarma :: security_architect" },
    {
      prompt: "cat ./focus.txt",
      output: "zero-trust architecture · AI & data security · cloud hardening",
    },
    {
      prompt: "uptime --career",
      output: "9+ years · 60+ engagements · 0 shortcuts",
    },
    { prompt: "sudo give –access guest", output: "granted. welcome, reader. ▊" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Journey — career timeline                                          */
/* ------------------------------------------------------------------ */

export interface JourneyEntry {
  period: string;
  role: string;
  org: string;
  summary: string;
  tags: string[];
  current?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    period: "2017 — 2019",
    role: "Security Operations Analyst",
    org: "CyberEdge Technologies",
    summary:
      "Started in the SOC trenches — triaging alerts, tuning SIEM rules, and writing my first incident-response playbooks. Learned the foundational truth of security: you can't protect what you can't see.",
    tags: ["SIEM", "Incident Response", "Threat Intel"],
  },
  {
    period: "2019 — 2021",
    role: "Security Engineer",
    org: "CloudSentinel Labs",
    summary:
      "Moved into cloud security as the company migrated to AWS and Azure. Hardened landing zones, rebuilt IAM from scratch, and automated CIS benchmark compliance across 200+ workloads.",
    tags: ["AWS", "Azure", "IAM", "Automation"],
  },
  {
    period: "2021 — 2023",
    role: "Senior Security Consultant",
    org: "Apex Advisory Group",
    summary:
      "Led security assessments and compliance programs for banking, healthcare and SaaS clients. Learned to translate deep technical risk into narratives boards actually act on.",
    tags: ["ISO 27001", "SOC 2", "Risk", "GRC"],
  },
  {
    period: "2023 — 2025",
    role: "Security Solution Architect",
    org: "Meridian Stack",
    summary:
      "Owned security-by-design for enterprise platforms — zero-trust transformations, micro-segmentation, policy-as-code, and DevSecOps enablement for teams shipping daily.",
    tags: ["Zero Trust", "DevSecOps", "Architecture"],
  },
  {
    period: "2025 — Present",
    role: "Independent Consultant & Architect",
    org: "Self-employed",
    summary:
      "Fractional security architecture for startups and enterprises, with a research focus on AI and LLM security — because the next attack surface is the one we're building right now.",
    tags: ["Consulting", "AI Security", "Research"],
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
  "Security isn't a single skill — it's a system of disciplines that have to work together under pressure. Here's where I spend my time.";

export const expertise: ExpertiseCard[] = [
  {
    title: "Security Architecture & Zero Trust",
    description:
      "Reference architectures that assume breach and contain it anyway. Identity-first perimeters, micro-segmentation, and policy-as-code that developers can actually live with.",
    tags: ["Zero Trust", "Identity", "Policy-as-Code"],
    span: "md:col-span-4 md:row-span-2",
    icon: "ShieldCheck",
    featured: true,
  },
  {
    title: "Cloud Security",
    description:
      "Guardrailed AWS, Azure and GCP landing zones. Least-privilege IAM, CSPM, and workload isolation baked in from day one.",
    tags: ["AWS", "Azure", "GCP"],
    span: "md:col-span-2",
    icon: "Cloud",
  },
  {
    title: "AI & Data Security",
    description:
      "Threat-modeling LLM applications, hardening RAG pipelines, prompt-injection defenses, and data lineage that survives an audit.",
    tags: ["LLM Security", "DLP", "Red Teaming"],
    span: "md:col-span-2",
    icon: "BrainCircuit",
  },
  {
    title: "Threat Modeling",
    description:
      "Lightweight STRIDE workshops that fit inside a sprint — risk you can act on, not a 90-page PDF nobody reads.",
    tags: ["STRIDE", "Attack Trees"],
    span: "md:col-span-2",
    icon: "Bug",
  },
  {
    title: "Governance & Compliance",
    description:
      "ISO 27001, SOC 2 and DPDP Act programs with evidence automation — compliance as a by-product of good engineering.",
    tags: ["ISO 27001", "SOC 2", "DPDP"],
    span: "md:col-span-2",
    icon: "Scale",
  },
  {
    title: "Incident Response",
    description:
      "Playbooks, tabletop exercises and post-mortem culture — because the difference between an incident and a breach is rehearsal.",
    tags: ["IR Playbooks", "Tabletops"],
    span: "md:col-span-2",
    icon: "Siren",
  },
];

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
    title: "CTF & Red Team Labs",
    description:
      "Weekend capture-the-flag and home attack labs. Breaking things on purpose is still the fastest way to learn how they fail.",
    icon: "Flag",
  },
  {
    title: "Homelab & Self-Hosting",
    description:
      "A rack of NUCs running Proxmox, a segmented VLAN for everything, and absolutely no trust in my own IoT devices.",
    icon: "Server",
  },
  {
    title: "Open Source",
    description:
      "Contributor to security tooling — mostly detection rules, Terraform guardrails, and docs. Small fixes, shipped upstream.",
    icon: "GitBranch",
  },
  {
    title: "Writing & Speaking",
    description:
      "Security should be legible to everyone it protects. I write and speak to close the gap between the boardroom and the terminal.",
    icon: "Mic",
  },
  {
    title: "AI Security Research",
    description:
      "Probing LLM agents for failure modes — prompt injection, tool abuse, memory exfiltration. The frontier is fun because it's fragile.",
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
/*  Insights — numbers, principles, domains                            */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 9, suffix: "+", label: "Years in security" },
  { value: 60, suffix: "+", label: "Engagements delivered" },
  { value: 35, suffix: "+", label: "Architectures reviewed" },
  { value: 12, suffix: "+", label: "Compliance programs" },
];

export const principles = [
  {
    title: "Security is a product feature, not a gate.",
    body: "Controls that block the business get bypassed. Controls that ship with the product get used.",
  },
  {
    title: "Assume breach. Design for containment.",
    body: "Prevention fails eventually. Blast radius is the variable you actually control.",
  },
  {
    title: "If it isn't measurable, it isn't managed.",
    body: "Mean time to detect beats mean time to argue about frameworks. Instrument everything.",
  },
  {
    title: "The best control is the one engineers love to use.",
    body: "Paved secure paths win. Make the right thing the easy thing and compliance becomes automatic.",
  },
];

export const domains = [
  "Zero Trust",
  "Cloud Security",
  "LLM Security",
  "Kubernetes",
  "IAM",
  "DevSecOps",
  "Threat Modeling",
  "SIEM & Detection",
  "Data Protection",
  "Cryptography",
  "Incident Response",
  "GRC",
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
