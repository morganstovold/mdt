Shared = {
    resource = GetCurrentResourceName(),
<<<<<<< HEAD
    framework = GetConvar('mdt:framework', 'qb'), -- 'esx', 'qb', 'custom' | to add a new framework create a 'modules\bridge\{framework}\sv_bridge.lua' and add the required functions
    language = GetConvar("mdt:language", "en"),       -- 'en', 'fr', 'de', 'es',
=======
    framework = Config.framework,
    language = Config.language,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
}

function Shared:print(...)
    if Config.debug then
        print('^5' .. string.format('[%s] %s', string.upper(self.resource), string.format(...)) .. '^0')
    end
end

if IsDuplicityVersion() then
    Server = {
        Bridge = {
            Auth = {},
            Profiles = {},
            Reports = {},
            Vehicles = {},
            Dispatch = {},
            Roster = {},
            Utils = {}
        },
        Legislation = {},
        Settings = {},
    }
else
<<<<<<< HEAD
    PlayerData = {}
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    Client = {}
end
