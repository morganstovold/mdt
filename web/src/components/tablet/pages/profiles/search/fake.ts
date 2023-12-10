import { type Profile } from '../profile/store';

export const fakeData: Profile = {
  noEntry: true,
  pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
  citizenid: '1039',
  firstname: 'carter',
  lastname: 'zamgato',
  dob: '2023-04-08',
  gender: '0',
  job: 'police',
  phone: '555-555-5555',
  notes:
    '<p>Vero velit rerum optio id dicta. Iure porro sed numquam perferendis nostrum. Ipsam quas esse numquam ab enim quaerat dolorem. Odio dolorem perferendis blanditiis iure ipsum eaque consectetur fugiat dolor. Officiis optio incidunt. Dolores fugiat iste iste<mark> voluptatum suscipit t</mark>empore dolore quod. Culpa repudiandae provident. At velit corrupti fugiat incidunt magnam ea eius ab<mark>. Nesciunt distincti</mark>o minus laborum vero sapiente illo. Delectus<mark> quam voluptatibus sed officiis. Ab facere quod tempora soluta ullam. R</mark>epudiandae expedita perspiciatis. Vitae consectetur quis. Ullam ad libero in repellendus iure odio maxime. Nemo ea unde impedit laborum nihil odio ipsa reiciendis. Voluptatibus inc<mark>idunt quis qui magnam iusto ullam eos aperiam. Ratione soluta vel non ratione debitis quasi voluptatum. C</mark>onsequuntur aspernatur neque perspiciatis error exercitationem officiis ipsum. Totam impedit assumenda iure nemo voluptatum illo voluptatem. Nemo id ipsa. Minus rerum ab autem. Assumenda nesciunt sequi quasi. Illo explicabo ad libero quidem sed dolorum quaerat quas odit. Autem</p><hr><blockquote><p>officia praesentium voluptates. Quas exercitationem porro culpa.</p></blockquote><hr><p></p>',
  licenses: [
    {
      name: 'driver',
      active: true,
    },
    {
      name: 'firearm',
      active: true,
    },
    {
      name: 'pilot',
      active: false,
    },
    {
      name: 'hunting',
      active: false,
    },
    {
      name: 'fishing',
      active: true,
    },
  ],
  convictions: [
    {
      charge: {
        id: 1,
        title: 'Breaking and Entering',
        description: 'Breaking and Entering into a property without permission.',
        fine: '1000',
        months: '1',
        type: '0',
      },
      count: 1,
    },
    {
      charge: {
        id: 2,
        title: 'Assault with a Deadly Weapon',
        description: 'Assaulting someone with a deadly weapon.',
        fine: '1000',
        months: '1',
        type: '2',
      },
      count: 2,
    },
    {
      charge: {
        id: 3,
        title: 'Grand Theft Auto',
        description: 'Stealing a vehicle without permission.',
        fine: '1000',
        months: '1',
        type: '1',
      },
      count: 7,
    },
  ],
  reports: [
    {
      id: 1,
      title: 'Laboriosam quisquam quidem vero excepturi occaecati.',
      officer: {
        firstname: 'Madonna',
        lastname: 'Hudson',
      },
    },
    {
      id: 2,
      title: 'Mollitia corrupti rerum doloribus nihil quam unde ullam.',
      warrant: true,
      officer: {
        firstname: 'Mylene',
        lastname: 'Prosacco',
      },
    },
  ],
  properties: [
    {
      name: '51062 Bergstrom Forks',
      type: 'house',
    },
    {
      name: '99044 Ozella Brook',
      type: 'house',
    },
    {
      name: '938 Huel Plains',
      type: 'house',
    },
    {
      name: '7772 Jackie Islands',
      type: 'house',
    },
  ],
  vehicles: [
    { plate: 'GX55 QLX', vehicle: 'Bentley Aventador' },
    { plate: 'NS94 MIK', vehicle: 'Volvo Wrangler' },
  ],
  gallery: [
    { url: 'https://loremflickr.com/640/480?lock=6627859412025344', notes: 'Persons Cat' },
    { url: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg', notes: 'Old Mugshot' },
<<<<<<< HEAD
    { url: 'https://i.imgur.com/26bDNNG.png' },
=======
    { url: 'https://i.imgur.com/26bDNNG.png', notes: '' },
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  ],
  updatedAt: new Date().toString(),
};

export const fakeSearchData: Partial<Profile>[] = [
  {
    pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
    citizenid: '1039',
    firstname: 'carter',
    lastname: 'zamgato',
    gender: '0',
    job: 'police',
    hasWarrant: true,
  },
  {
    pfp: 'https://i.imgur.com/26bDNNG.png',
    citizenid: '4913',
    firstname: 'don',
    lastname: 'morello',
    gender: '0',
    job: 'unemployed',
  },
];
