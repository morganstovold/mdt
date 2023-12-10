Server.DB:Table("mdt_vehicles",
    "id INT NOT NULL AUTO_INCREMENT, " ..
    "identifier VARCHAR(20) DEFAULT NULL, " ..
    "notes MEDIUMTEXT DEFAULT NULL, " ..
    "gallery MEDIUMTEXT DEFAULT NULL, " ..
    "PRIMARY KEY (identifier), " ..
    "KEY id (id)"
)

---@param source number
---@param resp function
---@param data string
OnEvent("vehicles:get", function(source, resp, data)
    local result = Server.Bridge.Vehicles.Get(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data table
OnEvent("vehicles:save", function(source, resp, data)
    local result = Server.Bridge.Vehicles.Save(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data string
OnEvent("vehicles:search", function(source, resp, data)
    local result = Server.Bridge.Vehicles.Search(data)
    resp(result)
end)
