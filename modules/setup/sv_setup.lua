<<<<<<< HEAD
local function CreateProfiles()
end

local function CreateOfficers()
end

RegisterCommand('create_data', function()
    CreateProfiles()
    CreateOfficers()
end, true)

RegisterCommand('convert_psmdt', function()

end, true)
=======
if Config.debug then
    RegisterCommand('defaultCharges', function()
        local charges = json.decode(LoadResourceFile(GetCurrentResourceName(), 'defaultCharges.json'))

        Server.Legislation.Save(charges)
    end, true)

    -- Future Todo
    -- RegisterCommand('convert_psmdt', function()

    -- end, true)
end
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
