---@return table
exports("GetLegislation", function()
    local result = Server.Legislation.Get()
    return result
end)
