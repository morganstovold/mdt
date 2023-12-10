<<<<<<< HEAD
RegisterNuiProxy("core:load")
=======
function LoadMDTCore()
    Method("auth:loading")
    local data = EmitEvent("auth:load")

    Method("auth:load", data)
end

RegisterNuiHandler("auth:reload", function(_)
    LoadMDTCore()
    return true
end)
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

RegisterNetEvent("mdt:open")
AddEventHandler("mdt:open", function()
    Display(true)
end)

<<<<<<< HEAD
RegisterNetEvent('mdt:close', function()
    Display(false)
end)

RegisterNuiHandler("CLOSE_TABLET", function(_, cb)
    DisplayProp(false)
    SetNuiFocus(false, false)
    cb({
        status = "ok"
    })
end)

if Config.keybind then
    RegisterCommand("display:mdt", function(source, args)
        Display(true)
    end, false)

    RegisterKeyMapping('display:mdt', "Open MDT", "keyboard", "RMENU")
=======
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
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
end
