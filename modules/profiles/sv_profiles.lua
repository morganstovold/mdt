Server.DB:Table("mdt_users",
    "id INT NOT NULL AUTO_INCREMENT, " ..
    "identifier VARCHAR(20) DEFAULT NULL, " ..
    "pfp TEXT DEFAULT NULL, " ..
    "notes MEDIUMTEXT DEFAULT NULL, " ..
    "gallery MEDIUMTEXT DEFAULT NULL, " ..
    "PRIMARY KEY (identifier), " ..
    "KEY id (id)"
)

---@param source number
---@param resp function
---@param data number
OnEvent("profiles:get", function(source, resp, data)
    local result = Server.Bridge.Profiles.Get(data)
    resp(result)
end)

---@param source number
---@param resp function
---@param data table
OnEvent("profiles:save", function(source, resp, data)
    local result = Server.Bridge.Profiles.Save(data)
    resp(result)
end)

---@param identifier string
---@return number
exports("CreateProfile", function(identifier)
    local query = [[
        INSERT INTO mdt_users (identifier, pfp, notes, gallery)
        VALUES (:identifier, :pfp, :notes, :gallery)
    ]]

    local params = {
        identifier = identifier,
        pfp = Config.profiles.default_pfp,
        notes = "<p></p>",
        gallery = json.encode({})
    }

    local result = MySQL.insert.await(query, params)

    return result
end)

---@param source number
---@param resp function
---@param data string
OnEvent("profiles:search", function(source, resp, data)
    local result = Server.Bridge.Profiles.Search(data)
    resp(result)
end)

-- RegisterCommand("profile", function()
--     local result = Server.Bridge.Profiles.Get(1012)
-- end, false)