Config = {
    framework = 'qb',
    language = 'en',
    debug = true,
    keybind = "RMENU",         -- set to false for no keyibnd
    defaultJob = 'unemployed', -- job officers will receive when fired
    jobs = {                   -- police jobs
        'police',
    },
    templates = { -- Report Templates
        {
            label = 'Incident Report',
            template = [[
              <h4>Incident Report:</h4>
              <h4>Medical Report:</h4>
              <h4>Confiscated Items: Locker #</h4>
              <h4>Use of Force:</h4>
              <h4>Probable Cause:</h4>
              <h4>Identified:</h4>
              <h4>Miranda Warning Given:</h4>
              <h4>GSR:</h4>
            ]],
        },
        {
            label = 'Traffic Report',
            template = [[
              <h4>Traffic Report:</h4>
              <h4>Make/Model:</h4>
              <h4>Color:</h4>
              <h4>License Plate:</h4>
              <h4>Impound Status(Yes/No):</h4>
            ]],
        },
    },
    certs = {
        { id = 1, label = 'marine' },
        { id = 2, label = 'air' },
        { id = 3, label = 'interceptor' },
        { id = 4, label = 'mbu' },
        { id = 5, label = 'swat' },
        { id = 6, label = 'detective' },
        { id = 7, label = 'k9' },
    },
    departments = {
        {
            name = "lspd", -- the name of the department also the job name
            ranks = {
                {
                    name = 'cadet',
                    permissions = {
                        'profiles.view',
                        'profiles.view.hidden',
                        'profiles.update',
                        'reports.view',
                        'reports.update',
                        'reports.new',
                        'vehicles.view',
                        'vehicles.update',
                        'legislation.view',
                        'roster.view',
                    }
                },
                {
                    name = 'officer',
                    permissions = {
                        'profiles.view',
                        'profiles.view.hidden',
                        'profiles.update',
                        'reports.view',
                        'reports.update',
                        'reports.new',
                        'vehicles.view',
                        'vehicles.update',
                        'legislation.view',
                        'roster.view',
                    }
                },
                {
                    name = 'sergeant',
                    permissions = {
                        'profiles.view',
                        'profiles.view.hidden',
                        'profiles.update',
                        'reports.view',
                        'reports.update',
                        'reports.new',
                        'reports.lock',
                        'vehicles.view',
                        'vehicles.update',
                        'legislation.view',
                        'roster.view',
                        'roster.fto',
                    }
                },
                {
                    name = 'lieutenant',
                    permissions = {
                        'profiles.view',
                        'profiles.view.hidden',
                        'profiles.update',
                        'reports.view',
                        'reports.update',
                        'reports.new',
                        'reports.lock',
                        'vehicles.view',
                        'vehicles.update',
                        'legislation.view',
                        'roster.view',
                        'roster.update',
                        'roster.hire',
                        'roster.fire',
                        'roster.certs',
                        'roster.fto',
                    }
                },
                {
                    name = 'commissioner',
                    permissions = {
                        'profiles.view',
                        'profiles.view.hidden',
                        'profiles.update',
                        'reports.view',
                        'reports.update',
                        'reports.new',
                        'reports.lock',
                        'vehicles.view',
                        'vehicles.update',
                        'legislation.view',
                        'legislation.update',
                        'roster.view',
                        'roster.update',
                        'roster.hire',
                        'roster.fire',
                        'roster.certs',
                        'roster.fto',
                    }
                },
            }
        },
    },
    checklist = {
        {
            id = 1,
            label = 'Tour of LSPD and Garage',
            description = 'Tour of the LSPD and Garage. This includes the briefing room, locker room, and the garage.',
        },
        {
            id = 2,
            label = 'F1 Menu',
            description = 'How to use the F1 Menu.',
        },
        {
            id = 3,
            label = 'MDT Use and Explanation',
            description = 'How to operate the MDT Tool and how to use it effectively.',
        },
        {
            id = 4,
            label = 'Everyday Procedures',
            description = 'How to impound a vehicle, fine a person, jail a person, and revoke a license.',
        },
        {
            id = 5,
            label = 'Basic Driving Procedures',
            description = 'How to drive a police vehicle and how to drive in a pursuit (Code 1/2/3)',
        },
        {
            id = 6,
            label = '10 Code Training',
            description = 'How to use the 10 Codes and what they mean.',
        },
        {
            id = 7,
            label = 'CDS Calls and Procedures',
            description = 'How to handle CDS Calls and how to handle them.',
        },
        {
            id = 8,
            label = '10-38 Showcase',
            description = 'Watched a 10-38 in action and how to handle it.',
        },
        {
            id = 9,
            label = '10-80 Showcase',
            description = 'Watched a 10-80 in action and how to handle it.',
        },
        {
            id = 10,
            label = 'Use of Force Showcase',
            description = 'Watched a Use of Force in action and how to handle it.',
        },
        {
            id = 11,
            label = 'Defensive Vehicle Positioning Showcase',
            description = 'Watched a Defensive Vehicle Positioning in action and how to handle it.',
        },
        {
            id = 12,
            label = 'Breaking Procedures',
            description = 'I dont even know what to put here.',
        },
    },
}
