if Config.debug then
    RegisterCommand('defaultCharges', function()
        local charges = json.decode(LoadResourceFile(GetCurrentResourceName(), 'defaultCharges.json'))

        Server.Legislation.Save(charges)
    end, true)

    -- Future Todo
    -- RegisterCommand('convert_psmdt', function()

    -- end, true)
end
