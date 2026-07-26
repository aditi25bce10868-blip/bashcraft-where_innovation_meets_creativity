export const CLUB_DESCRIPTION =
  'Bashcraft is a dynamic club that brings together passionate individuals from diverse domains – technology, design, content, event management, PR, and social media. Our teams work in synergy to create impactful events, foster creativity, and build a thriving community.';

// Map teamId → actual folder names in assets/Teams/
const folderMap = {
  'web-dev': 'Technical Team',
  design: 'Design',
  content: 'content',
  events: 'EVM',
  pr: 'PR & Outreach',
  social: 'Social media & Photography',
};

// Load all images – includes both lowercase and uppercase extensions
const teamImages = import.meta.glob(
  '../assets/Teams/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
);

// Normalise filename: lowercase, remove hyphens, spaces, underscores
const normalise = (str) =>
  str.toLowerCase().replace(/[-_\s]+/g, '');

export const getImagePath = (teamId, imageName) => {
  if (!imageName) return '';

  const folder = folderMap[teamId] || teamId;
  const needle = normalise(imageName);

  // 1. Try folder‑specific match (normalised)
  let match = Object.keys(teamImages).find((path) => {
    const normalizedPath = path.replace(/\\/g, '/');
    const folderPattern = `/Teams/${folder}/`;
    if (!normalizedPath.toLowerCase().includes(folderPattern.toLowerCase())) return false;
    const filename = normalizedPath.split('/').pop();
    return filename && normalise(filename) === needle;
  });

  // 2. Global normalised match
  if (!match) {
    match = Object.keys(teamImages).find((path) => {
      const filename = path.replace(/\\/g, '/').split('/').pop();
      return filename && normalise(filename) === needle;
    });
  }

  // 3. Case‑insensitive exact match
  if (!match) {
    match = Object.keys(teamImages).find((path) => {
      const filename = path.replace(/\\/g, '/').split('/').pop();
      return filename && filename.toLowerCase() === imageName.toLowerCase();
    });
  }

  if (match) {
    console.log(`✅ Image found: ${teamId} → "${imageName}" → ${match.split('/').pop()}`);
    return teamImages[match];
  }

  console.warn(`❌ Image not found: ${teamId} → "${imageName}"`);
  const allFilesInFolder = Object.keys(teamImages)
    .filter(p => p.replace(/\\/g, '/').toLowerCase().includes(`/teams/${folder.toLowerCase()}/`))
    .map(p => p.split('/').pop());
  console.warn(`   Available in /Teams/${folder}/:`, allFilesInFolder);
  return '';
};

export const FEATURED_TEAM = [
  { id: 'aditi-singh', fullName: 'ADITI SINGH', role: 'Team Lead', team: 'Technical Team', image: 'Aditi Singh.jpg' },
  { id: 'megh-joshi', fullName: 'Megh Joshi', role: 'Team Lead', team: 'Design Team', image: 'Megh Joshi.jpg' },
  { id: 'shivi-sanjay', fullName: 'Shivi Sanjay', role: 'Team Lead', team: 'Content Team', image: 'SHIVI SANJAY.jpg' },
  { id: 'arun-chaudhary', fullName: 'Arun Chaudhary', role: 'Team Lead', team: 'Event Management Team', image: 'ARUN CHAUDHARY.jpg' },
 
  { id: 'samriddh-sinha', fullName: 'Samriddh Sinha', role: 'Team Lead', team: 'Social Media & Photography Team', image: 'Samriddh Sinha.jpg' },
];


export const teamData = [
  // ----- Technical Team -----
  {
    id: 'web-dev',
    name: 'Technical Team',
    description: 'The technical team is responsible for managing the technological aspects of all events, such as managing web servers, creating interactive webpages, and providing content related to tech‑based events.',
    members: [
      {
        id: 'aditi-singh',
        fullName: 'ADITI SINGH',
        role: 'Team Lead',
        sentence: 'The collaborative space with safe harbor',
        word: 'Tenacious',
        image: 'Aditi Singh.jpg',
        linkedin: 'https://www.linkedin.com/in/aditi-singh-6aa56a379?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'ameesha-kumari',
        fullName: 'AMEESHA KUMARI',
        role: 'Core Member',
        sentence: ' a place to learn, create, and grow together.',
        word: 'Trailblazer',
        image: 'AMEESHA KUMARI.jpg',
        linkedin: 'https://www.linkedin.com/in/ameesha-kumari-663855411?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'anushka-yadav',
        fullName: 'Anushka Yadav',
        role: 'Core Member',
        sentence: ' a community that inspires me.',
        word: 'Ambitious',
        image: 'ANUSHKA YADAV.jpg',
        linkedin: 'https://www.linkedin.com/in/anushka-yadav-118b14390',
      },
      {
        id: 'raunak-sharma',
        fullName: 'Raunak Sharma',
        role: 'Core Member',
        sentence: ' an opportunity.',
        word: 'Catalyst',
        image: 'Raunak Sharma.jpg',
        linkedin: 'https://www.linkedin.com/in/raunak-sharma-b91650344',
      },
      {
        id: 'shrinivas-medewar',
        fullName: 'Shrinivas Medewar',
        role: 'Core Member',
        sentence: ' A platform to hone my skills.',
        word: 'Determined',
        image: 'Shrinivas Medewar.jpg',
        linkedin: 'https://www.linkedin.com/in/shrinivas-medewar-374a86219?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
    ],
  },
  // ----- Design Team -----
  {
    id: 'design',
    name: 'Design Team',
    description: 'The design team needs members with an arsenal of creativity, competent in UI/UX designing software and to have an open mind. Out‑of‑the‑box thinking is heavily encouraged and hard‑working members do strive the most.',
    members: [
      {
        id: 'megh-joshi',
        fullName: 'Megh Joshi',
        role: 'Team Lead',
        sentence: 'Passionate and driven.',
        word: 'Motivated',
        image: 'MEGH SNEHALKUMAR JOSHI.jpg',
        linkedin: 'http://www.linkedin.com/in/megh-joshi-35a681379',
      },
      {
        id: 'sunny-yadav',
        fullName: 'Sunny Yadav',
        role: 'Core Member',
        sentence: 'a place to learn.',
        word: 'Meticulous',
        image: 'SUNNY KUMAR YADAV.png',
        // Photo was cropping the top of the head on narrow/mobile widths — nudge focal point up.
        imagePosition: 'center 15%',
        linkedin: 'https://www.linkedin.com/in/sunny-yadav-513996338',
      },
      {
        id: 'saumya-dayal',
        fullName: 'Saumya Dayal',
        role: 'Core Member',
        sentence: 'a place to learn grow and explore.',
        word: 'Curious',
        image: 'SAUMYA DAYAL.jpg',
        linkedin: 'https://www.linkedin.com/in/saumya-dayal-8a65a7377',
      },
    ],
  },
  // ----- Content Team -----
  {
    id: 'content',
    name: 'Content Team',
    description: 'Members of the content team work on scripts for events, speeches, material for brochures, posters. The content team is always required to collaborate with other teams, to provide relevant material. Members are always expected to have ideas, apart from having excellent communication and writing skills.',
    members: [
      {
        id: 'shivi-sanjay',
        fullName: 'Shivi Sanjay',
        role: 'Team Lead',
        sentence: 'Growth.',
        word: 'Evolving',
        image: 'SHIVI SANJAY.jpeg',
        // Photo was cropping the top of the head on narrow/mobile widths — nudge focal point up.
        imagePosition: 'center 12%',
        linkedin: 'https://www.linkedin.com/in/shivi-sanjay-326a84324?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'yuvraj-rajoriya',
        fullName: 'Yuvraj Rajoriya',
        role: 'Core Member',
        sentence: ' a passionate community.',
        word: 'realone',
        image: 'Yuvraj.jpg',
        linkedin: 'https://www.linkedin.com/in/yuvraj-rajoriya-20b590323?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'irfan-alam-ansari',
        fullName: 'Irfan Alam Ansari',
        role: 'Core Member',
        sentence: 'a place where ideas find their voice.',
        word: 'Curious',
        image: 'IRFAN ALAM ANSARI.jpg',
        linkedin: 'https://www.linkedin.com/in/irfan-a-5440b51b8?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'sumit',
        fullName: 'Sumit',
        role: 'Core Member',
        sentence: 'a platform for creativity, learning, and teamwork.',
        word: 'Curious',
        image: 'SUMIT.jpg',
        linkedin: 'https://www.linkedin.com/in/sumit-sumit-34b109381?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
    ],
  },
  // ----- Event Management Team -----
  {
    id: 'events',
    name: 'Event Management Team',
    description: 'From deciding the venue, to managing the event budget, the event management team requires individuals with high critical thinking and resilience.',
    members: [
      {
        id: 'arun-chaudhary',
        fullName: 'Arun Chaudhary',
        role: 'Team Lead',
        sentence: 'a place to learn and explore.',
        word: 'Versatile',
        image: 'ARUN CHAUDHARY.jpg',
        linkedin: 'http://linkedin.com/in/arun-chaudhary-9b9547363',
      },
      {
        id: 'harshita-yadav',
        fullName: 'Harshita Anil Yadav',
        role: 'Core Member',
        sentence: ' Home.',
        word: 'Curious',
        image: 'Harshita  Yadav.jpeg',
        linkedin: 'http://www.linkedin.com/in/harshita-yadav-b4758132a',
      },
     
      {
        id: 'avin-pareek',
        fullName: 'Avin Pareek',
        role: 'Core Member',
        sentence: 'Way to self development.',
        word: 'Passionate',
        image: 'AVIN PAREEK.jpg',
        linkedin: 'https://www.linkedin.com/in/avin-pareek-8ba67b3a8?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'priyansh-saxena',
        fullName: 'Priyansh Saxena',
        role: 'Core Member',
        sentence: 'Amazing.',
        word: 'Management role',
        image: 'PRIYANSH SAXENA.jpeg',
        linkedin: 'https://www.linkedin.com/in/priyansh-saxena-45885a37b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'vardaan-yadav',
        fullName: 'Vardaan Yadav',
        role: 'Core Member',
        sentence: 'a place where I learned, collaborated, and created unforgettable memories.',
        word: 'Tenacious',
        image: 'VARDAAN YADAV.png',
        linkedin: 'https://www.linkedin.com/in/vardaan-yadav-51b5b93ba?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'anmol-panjvani',
        fullName: 'Anmol Panjvani',
        role: 'Core Member',
        sentence: ' A platform to learn, lead, and create unforgettable experiences.',
        word: 'Reliable',
        image: 'Anmol Panjwani.png',
        linkedin: 'https://www.linkedin.com/in/anmol-panjwani-0b6407379?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'rishabh-kapoor',
        fullName: 'Rishabh Kapoor',
        role: 'Core Member',
        sentence: ' a platform to learn, lead, create impact where ideas turn into memorable experiences.',
        word: 'Versatile',
        image: 'RISHABH ROHIT KAPOOR.jpeg',
        linkedin: 'https://www.linkedin.com/in/rishabh-kapoor-755a4639b/',
      },
      {
        id: 'janvee-gupta',
        fullName: 'Janvee Gupta',
        role: 'Core Member',
        sentence: 'A place to explore.',
        word: 'Determined',
        image: 'JANVEE GUPTA.jpg',
        linkedin: 'https://www.linkedin.com/in/janvee-gupta-57b8b940b',
      },
      {
        id: 'yashvi-ghaatiya',
        fullName: 'Yashvi Ghaatiya',
        role: 'Core Member',
        sentence: 'a powerhouse of creativity.',
        word: 'Versatile',
        image: 'YASHVI GHATIYA.jpeg',
        linkedin: 'https://www.linkedin.com/in/yashvi-ghaatiya-31909a424',
      },
    ],
  },
  // ----- PR & Outreach Team -----
  {
    id: 'pr',
    name: 'PR & Outreach Team',
    description: "Responsible for maintaining the club's image and PR. Correlating with the work of advertising and marketing, the PR and Outreach team also invites suitable sponsors for events, and contacts guests for guest lectures.",
    members: [
     
      {
        id: 'om-shrivastava',
        fullName: 'Om Shrivastava',
        role: 'Core Member',
        sentence: 'Aristocratic.',
        word: 'Proactive',
        image: 'OM SHRIVASTAVA.jpeg',
        linkedin: 'https://www.linkedin.com/in/omshrivastava/',
      },
     
      {
        id: 'hardik-pratap-singh',
        fullName: 'Hardik Pratap Singh',
        role: 'Core Member',
        sentence: ' an opportunity to develop my skills, build lasting connections, and contribute to something meaningful.',
        word: 'Earnest',
        image: 'HARDIK PRATAP SINGH.png',
        linkedin: 'https://www.linkedin.com/in/hardik-pratap-singh-83b809397?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'aditya-rajput',
        fullName: 'Aditya Rajput',
        role: 'Core Member',
        sentence: ' Opportunity.',
        word: 'Adaptable',
        image: 'ADITYA RAJPUT.png',
        linkedin: 'https://www.linkedin.com/in/aditya-rajput-260191384?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'deepanshu-arora',
        fullName: 'Deepanshu Arora',
        role: 'Core Member',
        sentence: ' the ultimate space to challenge my limits and contribute value.',
        word: 'Explorer',
        image: 'Deepanshu Arora.jpg',
        linkedin: 'https://www.linkedin.com/in/deepanshu-arora-1b6254394',
      },
    ],
  },
  // ----- Social Media & Photography Team -----
  {
    id: 'social',
    name: 'Social Media & Photography Team',
    description: 'As the name suggests, the Social Media & Photography Team handles the social media handle of the club, making sure the club is actively posting content and maintaining social media presence. Individuals with a good sense of photography, particularly skilled with photo & video editing software are encouraged to join.',
    members: [
      {
        id: 'samriddh-sinha',
        fullName: 'Samriddh Sinha',
        role: 'Team Lead',
        sentence: ' Responsibility.',
        word: 'Driven',
        image: 'SAMRIDDH SINHA.png',
        linkedin: 'https://www.linkedin.com/in/samriddh-sinha-65915b313/',
      },
      {
        id: 'ridhima-pandey',
        fullName: 'Ridhima Pandey',
        role: 'Core Member',
        sentence: 'learning hub.',
        word: 'Determined',
        image: 'Ridhima Pandey.jpg',
        linkedin: 'https://www.linkedin.com/in/ridhima-pandey-980a21270?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'mridul-sharma',
        fullName: 'Mridul Sharma',
        role: 'Core Member',
        sentence: ' My priority.',
        word: 'Responsive',
        image: 'MRIDUL SHARMA.jpeg',
        linkedin: 'https://www.linkedin.com/in/mridul-sharma-637160307?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
      {
        id: 'shrikant-nimbhorkar',
        fullName: 'Shrikant Nimbhorkar',
        role: 'Core Member',
        sentence: ' An opportunity to learn new things and create meaningful memories.',
        word: 'Creative',
        image: 'SHRIKANT NIMBHORKAR.jpeg',
        linkedin: 'https://www.linkedin.com/in/shrikant-nimbhorkar-5a18ba372?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
      {
        id: 'apoorav-raina',
        fullName: 'Apoorav Raina',
        role: 'Core Member',
        sentence: ' an opportunity to explore new skills and make meaningful connections.',
        word: 'Curious',
        image: 'APOORAV RAINA.webp',
        linkedin: 'https://www.linkedin.com/in/apoorav-raina-82a800343?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
      {
        id: 'kshitij-jha',
        fullName: 'Kshitij Jha',
        role: 'Core Member',
        sentence: ' A place where my creativity will meet its purpose.',
        word: 'Musician',
        image: 'KSHITIJ JHA.jpg',
        linkedin: 'https://www.linkedin.com/in/kshitij-jha-5b2b48377?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
    ],
  },
];
