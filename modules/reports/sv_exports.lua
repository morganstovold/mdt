---@param value string
---@param recent? boolean
exports("SearchReports", function(value, recent)
    local result = Server.Bridge.Reports.Search(value, recent)
    return result
end)

---@param value number
exports("GetReport", function(value)
    local result = Server.Bridge.Reports.Get(value)
    return result
end)

---@param data table
exports("SaveReport", function(data)
    local result = Server.Bridge.Reports.Save(data)
    return result
end)