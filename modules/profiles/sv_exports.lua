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

---@param identifier number
---@return table
exports("GetProfile", function(identifier)
    local result = Server.Bridge.Profiles.Get(identifier)
    return result
end)

---@param identifier string
---@return boolean
exports("DeleteProfile", function(identifier)
    local query = [[
        DELETE FROM mdt_users
        WHERE identifier = :identifier
    ]]

    local params = {
        identifier = identifier
    }

    local result = MySQL.query.await(query, params)

    return result.affectedRows > 0
end)
