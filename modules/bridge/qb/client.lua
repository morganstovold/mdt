function DisplayProp(status)
    ExecuteCommand(status and "e tablet2" or "e c")
end

function Display(status)
    DisplayProp(true)
    SetNuiFocus(status, status)
    Method("TABLET_DISPLAY", status)
end
exports('display', Display)

RegisterNetEvent("QBCore:Client:OnPlayerLoaded")
AddEventHandler('QBCore:Client:OnPlayerLoaded', function(source, job)
    LoadMDTCore()
end)

RegisterNetEvent('QBCore:Client:OnPlayerUnload')
AddEventHandler('QBCore:Client:OnPlayerUnload', function(source, job)
    Display(false)
    LoadMDTCore()
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate')
AddEventHandler('QBCore:Client:OnJobUpdate', function(source, job)
    LoadMDTCore()
end)
