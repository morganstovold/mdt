Shared = {
    resource = GetCurrentResourceName(),
    framework = Config.framework,
    language = Config.language,
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
    Client = {}
end
