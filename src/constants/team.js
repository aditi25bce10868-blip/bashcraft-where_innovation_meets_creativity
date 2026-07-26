// ============================================================
// BashCraft Club — Team Roster
// Source of truth for team data used on Home (preview) and Team page.
// To add a photo, set the `photo` field to an imported image path.
// ============================================================

import vinehaPhoto from '../assets/team/vineha-gupta.jpg';
import divyanshPhoto from '../assets/team/divyansh-agrawal.jpg';
import prantikPhoto from '../assets/team/prantik-kesariya.jpg';
import anushaPhoto from '../assets/team/anusha-singh-rajput.jpg';
import aryanPhoto from '../assets/team/aryan-chaturvedi.jpg';

// Full 15-member roster for the /team page
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

// 5-member preview for the Home page (all 5 members now have real photos!)
export const HOME_TEAM_PREVIEW = [
  {
    id: 101,
    name: 'Vineha Gupta',
    role: 'President',
    photo: vinehaPhoto,
    description: 'Leading the club\'s vision, strategy, and community growth.',
    vision: '"No fluff, only asli engineering". My vision is to make BashCraft a compass for aspiring engineers, a community where students don\'t just attend events but leave with a clear roadmap, the confidence to begin and the mindset to keep building. Through structured roadmaps, mentorship & workshops we aim to help every student find direction in tech.',
    trait: 'Resilient',
    linkedin: 'https://www.linkedin.com/in/vinehagupta',
  },
  {
    id: 102,
    name: 'Aryan Chaturvedi',
    role: 'Vice President',
    photo: aryanPhoto,
    description: 'Supporting strategic initiatives and cross-team coordination.',
    vision: 'To transform this community into a launchpad for world-class builders, where innovation meets relentless execution.',
    trait: 'Collaborative',
    linkedin: 'https://www.linkedin.com/in/aryan-chaturvedi1602?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: 103,
    name: 'Prantik Kesariya',
    role: 'Operations Lead',
    photo: prantikPhoto,
    description: 'Ensuring seamless execution of all club operations.',
    vision: 'My vision is to build a community where everyone gets an opportunity to grow, every voice matters and every contribution leaves a lasting impact.',
    trait: 'Inquisitive',
    linkedin: 'https://www.linkedin.com/in/prantik-kesariya',
  },
  {
    id: 104,
    name: 'Anusha Singh Rajput',
    role: 'Secretary',
    photo: anushaPhoto,
    description: 'Managing documentation and organizational workflows.',
    vision: 'To empower every student to learn about emerging technologies and become leaders in the digital future.',
    trait: 'Catalyst',
    linkedin: 'https://www.linkedin.com/in/anusha-singh-rajput-361096340?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 105,
    name: 'Divyansh Agrawal',
    role: 'Treasurer',
    photo: divyanshPhoto,
    description: 'Overseeing financial planning and budget management.',
    vision: 'Nothing for the club side but want to organise an successful event under my guidance.',
    trait: 'Pathfinder',
    linkedin: 'https://www.linkedin.com/in/divyansh-agrawal-ab9117331/',
  },
];

// Legacy export for backward compat
export const FEATURED_TEAM = HOME_TEAM_PREVIEW;
