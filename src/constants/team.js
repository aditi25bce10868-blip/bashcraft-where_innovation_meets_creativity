// ============================================================
// BashCraft Club — Team Roster
// Source of truth for team data used on Home (preview) and Team page.
// To add a photo, set the `photo` field to an imported image path.
// ============================================================

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dr. Dheresh Soni',
    role: 'Faculty Coordinator',
    photo: null,
    description: 'Guiding the club\'s academic and organizational direction.',
    isFaculty: true,
  },
  {
    id: 2,
    name: 'Aditya Joshi',
    role: 'Founder & President',
    photo: null,
    description: 'Visionary leader driving the club\'s mission and growth.',
  },
  {
    id: 3,
    name: 'Prakhar Pande',
    role: 'Vice President',
    photo: null,
    description: 'Supporting strategic initiatives and team coordination.',
  },
  {
    id: 4,
    name: 'Tanya Chaturvedi',
    role: 'Joint Secretary',
    photo: null,
    description: 'Bridging communication between departments and teams.',
  },
  {
    id: 5,
    name: 'Hemansh Bhagtani',
    role: 'Secretary',
    photo: null,
    description: 'Managing documentation and organizational workflows.',
  },
  {
    id: 6,
    name: 'Aryaman Jha',
    role: 'Operations Lead',
    photo: null,
    description: 'Ensuring seamless execution of all club operations.',
  },
  {
    id: 7,
    name: 'Nisarg Gajjar',
    role: 'Treasurer',
    photo: null,
    description: 'Overseeing financial planning and budget management.',
  },
  {
    id: 8,
    name: 'Madhuram Kulshrestha',
    role: 'Event Coordinator',
    photo: null,
    description: 'Planning and executing high-impact club events.',
  },
  {
    id: 9,
    name: 'Brajesh Mohanty',
    role: 'Assistant Operations Lead',
    photo: null,
    description: 'Supporting day-to-day operational processes.',
  },
  {
    id: 10,
    name: 'Siddharth Mohril',
    role: 'Design Lead',
    photo: null,
    description: 'Crafting the visual identity and design language of the club.',
  },
  {
    id: 11,
    name: 'Shreyansh Uttam',
    role: 'Social Media Lead',
    photo: null,
    description: 'Amplifying the club\'s presence across digital platforms.',
  },
  {
    id: 12,
    name: 'Om Mishra',
    role: 'Tech Lead',
    photo: null,
    description: 'Driving technical projects and engineering initiatives.',
  },
  {
    id: 13,
    name: 'Jayant Singh Rawat',
    role: 'Event Management Lead',
    photo: null,
    description: 'Coordinating logistics and event production at scale.',
  },
  {
    id: 14,
    name: 'Aastha Adhikari',
    role: 'PR & Outreach Lead',
    photo: null,
    description: 'Building partnerships and expanding the club\'s reach.',
  },
  {
    id: 15,
    name: 'Himanshu Kumar Singh',
    role: 'Content Lead',
    photo: null,
    description: 'Creating compelling content that tells the BashCraft story.',
  },
];

// Subset for the Home page team preview
export const FEATURED_TEAM = TEAM_MEMBERS.filter(m =>
  ['Founder & President', 'Vice President', 'Design Lead', 'Tech Lead'].includes(m.role)
);
