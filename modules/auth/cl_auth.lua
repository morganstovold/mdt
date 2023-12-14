function LoadMDTCore()
    Method("auth:loading")
    local data = EmitEvent("auth:load")

    Method("auth:load", data)
end

RegisterNuiHandler("auth:reload", function(_)
    LoadMDTCore()
    return true
end)

RegisterNetEvent("mdt:open")
AddEventHandler("mdt:open", function()
    Display(true)
end)

RegisterNetEvent('mdt:close')
AddEventHandler("mdt:close", function()
    Display(false)
end)

RegisterNuiHandler("CLOSE_TABLET", function(_)
    DisplayProp(false)
    SetNuiFocus(false, false)
    return true
end)

RegisterCommand("mdt", function(source, args)
    Display(true)
end, false)

if Config.keybind then
    RegisterKeyMapping('mdt', "Open MDT", "keyboard", "RMENU")
end
