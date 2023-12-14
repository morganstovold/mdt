---@param value string
exports("SearchRoster", function(value)
    local result = Server.Bridge.Roster.Search(value)
    return result
end)

---@param value string
exports("GetRoster", function(value)
    local result = Server.Bridge.Roster.Get(value)
    return result
end)

---@param data table
exports("SaveRoster", function(data)
    local result = Server.Bridge.Roster.Save(data)
    return result
end)

---@param value string
exports("FireProfiles", function(value)
    local result = Server.Bridge.Profiles.Fire(value)
    return result
end)