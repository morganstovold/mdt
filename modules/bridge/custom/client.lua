function Display(status)
    local job = exports['PedManager']:PedManager('myJob')
    if job == 'police' or job == 'judge' or job == 'districtattorney' or job == 'doj' or job == 'countyclerk' or job ==
        'adistrictattorney' or job == 'mayor' or job == 'lawyer' then
        DisplayProp(true)
        SetNuiFocus(status, status)
        Method("TABLET_DISPLAY", status)
    end
end

exports('display', Display)

AddEventHandler('mrp-job:recruit', function(job)
    Method("core:load")
end)

AddEventHandler('mrp-jobmanager:playerBecameRank', function(rank)
    Method("core:load")
end)

AddEventHandler("mrp-framework:playerSpawned", function()
    Method("core:load")
end)
