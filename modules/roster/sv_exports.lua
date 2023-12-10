<<<<<<< HEAD
--@param id string
--@return table
exports("GetOfficerData", function(id)
    local result = Server.Bridge.Roster.Get(id)
    local certs = result.certs

    local myNewCerts = {
        marine = certs[1] ~= nil,
        air = certs[2] ~= nil,
        interceptor = certs[3] ~= nil,
        mbu = certs[4] ~= nil,
        swat = certs[5] ~= nil,
        detective = certs[6] ~= nil,
        k9 = certs[7] ~= nil,
    }

    result.certs = myNewCerts

=======
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
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    return result
end)