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
