<<<<<<< HEAD
OnEvent("core:load", function(source, resp, data)
    local result = Server.Bridge.Auth.Load(source)
    resp(result)
end)

RegisterCommand("officer", function(source, args)
    local cid = args[1]

    local data = {
        citizenid = cid,
        callsign = 0,
        department = 'lspd',
        rank = 0,
        certs = {},
        checklist = {},
        hiredBy = 12,
        noEntry = true
    }

    Server.Bridge.Roster.Save(data)
end, true)

RegisterCommand("createofficers", function(source, args)
    local query = [[
        SELECT * FROM players WHERE JSON_EXTRACT(job, "$.name") = @job
    ]]

    local params = {
        job = "police"
    }

    local results = MySQL.query.await(query, params)

    for i = 1, #results, 1 do
        local officer = results[i]
        local job = json.decode(officer.job)
        local data = {
            citizenid = officer.citizenid,
            callsign = 0,
            department = 'lspd',
            rank = job.grade.level,
            certs = {},
            checklist = {},
            hiredBy = args[1] or 0,
            noEntry = true
        }

        Server.Bridge.Roster.Save(data)
    end
end, true)
=======
OnEvent("auth:load", function(source, resp, data)
    local result = Server.Bridge.Auth.Load(source)
    resp(result)
end)
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
