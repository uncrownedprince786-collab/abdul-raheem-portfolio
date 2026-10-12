export const site = {
  name: "Abdul Raheem",
  role: "Technical Project Manager",
  tagline:
    "Technical Project Manager with 7+ years of experience turning unclear requirements into shipped products — across web, mobile, and SaaS.",
  email: "pro.engrraheem@gmail.com",
  linkedin: "https://linkedin.com/in/abdul-raheem-3489b3107",
  linkedinLabel: "linkedin.com/in/abdul-raheem-3489b3107",
  url: "https://abdulraheem-pm.vercel.app",
} as const;

export type Project = {
  name: string;
  context: string;
  role: string;
  impact: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "SaaS Property Rental Platform",
    context:
      "Delivered an end-to-end rental platform for a Saudi client, valued at over $50,000.",
    role: "Led end-to-end delivery",
    impact: [
      "Shipped a working MVP in six months",
      "Coordinated billing, user management, payments, and analytics",
      "Kept client and engineering aligned through weekly checkpoints",
    ],
    tags: ["SaaS", "Payments", "Client Delivery"],
  },
  {
    name: "Shorex Recycling Platform",
    context:
      "Managed a recycling logistics platform from design to live deployment.",
    role: "Delivery ownership",
    impact: [
      "Connected customers, drivers, and warehouse teams in one flow",
      "Delivered mobile apps plus admin dashboards with role-based access",
      "Handled rollout and post-launch fixes with the client team",
    ],
    tags: ["Mobile", "Logistics", "Role-based Access"],
  },
  {
    name: "Freelance Lead Intelligence Platform",
    context:
      "A personal product exploring practical automation in opportunity discovery.",
    role: "Solo owner — planning to live release",
    impact: [
      "Owned the full cycle: planning, architecture, development, release",
      "Focused on real, useful automation rather than hype",
      "An ongoing learning project kept intentionally small and practical",
    ],
    tags: ["Personal Product", "Automation", "Full Ownership"],
  },
  {
    name: "Doubdt Mind Educational Platform",
    context:
      "A multi-role educational platform for students, instructors, and administrators.",
    role: "Coordination lead",
    impact: [
      "Coordinated a Laravel backend with a React admin panel",
      "Defined roles, permissions, and core learning flows",
      "Managed timelines across a distributed team",
    ],
    tags: ["EdTech", "Laravel", "React"],
  },
];

export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    title: "Clarity before speed",
    body: "I spend time getting requirements and scope clear early. It saves weeks later.",
  },
  {
    title: "Visible progress",
    body: "Stakeholders and teams always know where things stand — no late surprises.",
  },
  {
    title: "Quality is part of delivery",
    body: "I treat testing gaps and requirement mismatches as delivery issues, not afterthoughts.",
  },
  {
    title: "Calm under changing priorities",
    body: "Scope shifts are normal. I bring structure instead of panic.",
  },
];

export type JourneyItem = {
  period: string;
  title: string;
};

export const journey: JourneyItem[] = [
  { period: "2019", title: "Started in QA" },
  { period: "2020–2024", title: "Project Manager — 50+ international client projects" },
  { period: "2024–Present", title: "Product Manager & QA Lead (Remote, Saudi Arabia)" },
  {
    period: "Ongoing",
    title: "Expanding practical automation skills while staying focused on solid delivery",
  },
];
