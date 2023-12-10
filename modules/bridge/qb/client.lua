<<<<<<< HEAD
=======
function DisplayProp(status)
    ExecuteCommand(status and "e tablet2" or "e c")
end

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Display(status)
    DisplayProp(true)
    SetNuiFocus(status, status)
    Method("TABLET_DISPLAY", status)
end
<<<<<<< HEAD

exports('display', Display)

AddEventHandler('QBCore:Client:OnPlayerLoaded', function(source, job)
    Method("core:load")
end)

AddEventHandler('QbCore:Server:OnJobUpdate', function(source, job)
    Method("core:load")
=======
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
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
end)
