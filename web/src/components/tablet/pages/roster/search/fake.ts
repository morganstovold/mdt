import { type Officer } from '../officer/store';

export const fakeData: Officer = {
  pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
  citizenid: '1039',
  firstname: 'carter',
  lastname: 'zamgato',
  phone: '555-555-5555',
<<<<<<< HEAD
  callsign: "192",
=======
  callsign: '192',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  department: 'lspd',
  rank: 4,
  checklist: [
    {
      id: 1,
      performance: '4',
      notes: 'Lorem ipsum dolor sit amet conse adipisicing elit. Quisquam, voluptatum.',
      time: new Date().toString(),
      fto: {
        citizenid: '4913',
        firstname: 'don',
        lastname: 'morello',
<<<<<<< HEAD
        callsign: "293",
=======
        callsign: '293',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      },
    },
  ],
  reports: [
    {
      id: 1,
      title: 'Hic sed expedita consequunt',
    },
    {
      id: 2,
      title: 'Molestias incidunt fug dolor',
    },
  ],
  certs: [1, 2, 3, 4],
  hiredBy: {
<<<<<<< HEAD
    pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
    citizenid: '4913',
    firstname: 'don',
    lastname: 'morello',
    callsign: "293",
    department: 'lspd',
    rank: 4,
  },
=======
    citizenid: '0',
  } as Officer['hiredBy'],
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  time: new Date().toString(),
  updatedAt: new Date().toString(),
};

export const fakeSearchData: Partial<Officer>[] = [
  {
    pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
    citizenid: '1039',
    firstname: 'carter',
    lastname: 'zamgato',
    phone: '555-555-5555',
<<<<<<< HEAD
    callsign: "192",
=======
    callsign: '192',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    department: 'lspd',
    rank: 4,
  },
  {
    pfp: 'https://i.imgur.com/ylNaDDF.png',
    citizenid: '4913',
    firstname: 'don',
    lastname: 'morello',
    phone: '555-555-5555',
<<<<<<< HEAD
    callsign: "293",
=======
    callsign: '293',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    department: 'lspd',
    rank: 4,
  },
];
