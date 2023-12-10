import { Vehicle } from '../vehicle/store';

export const fakeData: Vehicle = {
  id: 1,
  plate: 'HO90NEB',
  model: 'declasse tampa',
  pfp: 'https://pbs.twimg.com/profile_images/1384641295776305154/6uQdhVGY_400x400.jpg',
  citizenid: 'MHY95099',
  firstname: 'carter',
  lastname: 'zamgato',
  gender: '0',
  job: 'police',
  notes:
    '<p>Vero velit rerum optio id dicta. Iure porro sed numquam perferendis nostrum. Ipsam quas esse numquam ab enim quaerat dolorem. Odio dolorem perferendis blanditiis iure ipsum eaque consectetur fugiat dolor. Officiis optio incidunt. Dolores fugiat iste iste<mark> voluptatum suscipit t</mark>empore dolore quod. Culpa repudiandae provident. At velit corrupti fugiat incidunt magnam ea eius ab<mark>. Nesciunt distincti</mark>o minus laborum vero sapiente illo. Delectus<mark> quam voluptatibus sed officiis. Ab facere quod tempora soluta ullam. R</mark>epudiandae expedita perspiciatis. Vitae consectetur quis. Ullam ad libero in repellendus iure odio maxime. Nemo ea unde impedit laborum nihil odio ipsa reiciendis. Voluptatibus inc<mark>idunt quis qui magnam iusto ullam eos aperiam. Ratione soluta vel non ratione debitis quasi voluptatum. C</mark>onsequuntur aspernatur neque perspiciatis error exercitationem officiis ipsum. Totam impedit assumenda iure nemo voluptatum illo voluptatem. Nemo id ipsa. Minus rerum ab autem. Assumenda nesciunt sequi quasi. Illo explicabo ad libero quidem sed dolorum quaerat quas odit. Autem</p><hr><blockquote><p>officia praesentium voluptates. Quas exercitationem porro culpa.</p></blockquote><hr><p></p>',
  gallery: [],
  updatedAt: new Date().toString(),
};

export const fakeSearchData: Partial<Vehicle>[] = [
  {
    id: 1,
    plate: 'HO90NEB',
    model: 'declasse tampa',
    firstname: 'carter',
    lastname: 'zamgato',
  },
];
