RegisterNuiProxy("reports:get")
RegisterNuiProxy("reports:save")
RegisterNuiProxy("reports:search")
<<<<<<< HEAD
RegisterNuiProxy("reports:recent")
RegisterNuiProxy("reports:locker")
RegisterNuiProxy("reports:openEvidence")

local invToken = ''
RegisterNetEvent('moment-inventory:ObtainToken', function(t)
    invToken = t;
end)

RegisterNetEvent('moment-mdt:OpenEvidence', function(data)
    print(data.uuid)
    TriggerEvent('moment-inventory:stash:coolio', {
        token = invToken,
        uuid = data.uuid,
        type = 'evidence',
    })
end)
=======
RegisterNuiProxy("reports:recent")
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
