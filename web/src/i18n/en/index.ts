import type { BaseTranslation } from '../i18n-types.js';

const en = {
  header: {
    title: 'Mobile Database Terminal',
    welcome: 'Welcome Back, {name:string}',
  },
  pages: {
    profiles: 'Profiles',
    reports: 'Reports',
    vehicles: 'Vehicles',
    legislation: 'Legislation',
    gallery: 'Gallery',
  },
  profiles: {
    search: 'Search Profiles (id, name, job, warrant)',
    licenses: 'Licenses',
    convictions: 'Convictions',
    revoke: 'Revoke License',
    grant: 'Grant License',
    pfp: 'Profile Picture',
    properties: 'Real Estate',
    address: 'Address',
  },
  reports: {
<<<<<<< HEAD
    viewReport: 'View Report',
    new: 'New Report',
    openEvidence: 'Open Evidence',
    evidence: 'Evidence',
    title: "Report Title"
  },
  vehicles: {
    viewVehicle: 'View Vehicle',
=======
    new: 'New Report',
    title: 'Report Title',
  },
  vehicles: {
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  },
  legislation: {
    infraction: 'Infraction',
    misdemeanor: 'Misdemeanor',
    felony: 'Felony',
  },
  gallery: {
<<<<<<< HEAD
=======
    title: 'Gallery',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    imageURL: 'Image URL',
    notes: 'Notes',
    addImage: 'Add Image',
  },
<<<<<<< HEAD
=======
  roster: {
    hiredBy: 'Hiring Officer',
    noHiredBy: 'Unable to Load Hiring Officer',
  },
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  utils: {
    warrant: 'WARRANT',
    no_results: 'No Results :[',
    search: 'Search',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    change: 'Change',
    remove: 'Remove',
    add: 'Add',
    update: 'Update',
    hidden: 'Hidden',
    lastUpdated: 'Last Updated',
    type: 'Type',
    apply: 'Apply',
    none: 'None',
<<<<<<< HEAD
=======
    loading: 'Loading',
    vProfile: "View Profile",
    vOfficers: "View Officer",
    vReport: "View Report",
    vVehicle: "View Vehicle",
  },
  page: {
    fallback: {
      title: 'Failed to load page',
      description: 'Something went wrong',
    },
    nopermission: {
      title: 'Unable to load page',
      description: 'You dont have permission to view this page',
    },
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  },
  unknown: 'Unknown',
} satisfies BaseTranslation;

export default en;
