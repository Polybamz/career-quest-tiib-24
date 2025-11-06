// User role types
export type SubsPlan = 'Starter' | 'Professional' | 'Enterprise';

// User type definition
// export interface User {
//     uid: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//     role: SubsPlan;
//     avatar?: string;
//     bio?: string;
//     phone?: string;
//     createdAt: Date;
//     lastLoginAt?: Date;
//     isActive: boolean;
// }

// // Admin type for admin management
// export interface Admin extends User {
//     permissions: string[];
// }

// Role permissions
export const PLAN_PRE: Record<SubsPlan, string[]> = {
    Starter: [
        "Post up to 5 jobs per month",
        "Access to candidate profiles",
        "Basic applicant tracking",
        "Email support",
        "30-day job listing duration"
    ],
    Professional: [
        "Post up to 20 jobs per month",
        "Advanced candidate search filters",
        "Priority job placement",
        "Dedicated account manager",
        "60-day job listing duration",
        "Analytics and reporting",
        "Phone & email support"
    ],
    Enterprise: [
        "Unlimited job postings",
        "Premium candidate database access",
        "Custom branding on job posts",
        "API integration",
        "90-day job listing duration",
        "Advanced analytics dashboard",
        "24/7 priority support",
        "Dedicated recruitment consultant"
    ],
};

// Permission checking helper
export const hasPermission = (SubsPlan: SubsPlan, plan: string): boolean => {
    return PLAN_PRE[SubsPlan]?.includes(plan) || false;
};

// Role display names
export const PLAN_DISPLAY_NAMES = {
    super_admin: 'Super Admin',
    finance_admin: 'Finance Admin',
    analyst_admin: 'Analyst Admin',
    regular_user: 'Regular User',
    event_admin: 'Event Manager'
} as const;

// // Role descriptions
// export const ROLE_DESCRIPTIONS = {
//     super_admin: 'Full access to all system features and admin management',
//     finance_admin: 'Access to financial reports, donations, and budget management',
//     analyst_admin: 'Access to analytics, reports, and data visualization',
//     regular_user: 'Basic access to view programs, events, and impact stories',
//     event_admin: 'Full access to create, edit, and delete events and programs'
// } as const;