export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  category: "all" | "web" | "enterprise" | "mobile" | "pos";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterested: string;
  message: string;
}
