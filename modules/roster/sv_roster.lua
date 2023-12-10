Server.DB:Table("mdt_roster",
    "id INT NOT NULL AUTO_INCREMENT, " ..
    "identifier VARCHAR(20) NOT NULL, " ..
    "department VARCHAR(20) NOT NULL, " ..
    "callsign VARCHAR(20) DEFAULT '0', " ..
    "certs MEDIUMTEXT NOT NULL, " ..
    "checklist MEDIUMTEXT NOT NULL, " ..
    "hiredBy VARCHAR(20) NOT NULL, " ..
    "PRIMARY KEY (identifier), " ..
    "KEY id (id)"
)

---@param source number
---@param resp function
---@param data string
OnEvent("roster:get", function(source, resp, data)
    local result = Server.Bridge.Roster.Get(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data table
OnEvent("roster:save", function(source, resp, data)
    local result = Server.Bridge.Roster.Save(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data string
OnEvent("roster:search", function(source, resp, data)
    local result = Server.Bridge.Roster.Search(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data string
OnEvent("roster:fire", function(source, resp, data)
    local result = Server.Bridge.Roster.Fire(data)
    resp(result)
end)
