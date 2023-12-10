Server.DB:Table("mdt_reports",
    "id INT NOT NULL AUTO_INCREMENT, " ..
    "locked BOOLEAN DEFAULT FALSE, " ..
    "title VARCHAR(255) DEFAULT NULL, " ..
    "type VARCHAR(255) DEFAULT NULL, " ..
    "notes MEDIUMTEXT DEFAULT NULL, " ..
    "offenders MEDIUMTEXT DEFAULT NULL, " ..
    "officers MEDIUMTEXT DEFAULT NULL, " ..
    "gallery MEDIUMTEXT DEFAULT NULL, " ..
    "PRIMARY KEY (id), " ..
    "KEY id (id)"
)

---@param source number
---@param resp function
---@param data number
OnEvent("reports:get", function(source, resp, data)
    local result = Server.Bridge.Reports.Get(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data table
OnEvent("reports:save", function(source, resp, data)
    local result = Server.Bridge.Reports.Save(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data string
OnEvent("reports:search", function(source, resp, data)
    local result = Server.Bridge.Reports.Search(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data string
OnEvent("reports:recent", function(source, resp, data)
    local result = Server.Bridge.Reports.Search("", true)
    resp(result)
end)
<<<<<<< HEAD

---@param source number
---@param resp function
---@param data number
OnEvent("reports:locker", function(source, resp, data)
    local result = Server.Bridge.Reports.Locker(data)
    resp(result)
end)

-- OnEvent("reports:openEvidence", function(source, resp, data)
--     if data.id == 'new' then TriggerClientEvent('DoLongHudText', source, 'You cannot open this evidence locker as the report is not yet fully made.', 2) return resp('ok') end

--     local result = Server.Bridge.Reports.OpenEvidence(data)
--     if result then
--         TriggerClientEvent('mdt:close', source)
--         Citizen.Wait(500)
--         TriggerClientEvent('moment-mdt:OpenEvidence', source, {
--             uuid = data.id,
--             type = 'evidence',
--         })
--         resp('ok')
--         return
--     end
    
--     resp('error')
-- end)
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
