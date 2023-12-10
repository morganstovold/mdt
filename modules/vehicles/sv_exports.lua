---@param value string
exports("SearchVehicles", function(value)
    local result = Server.Bridge.Vehicles.Search(value)
    return result
end)

---@param value string
exports("GetVehicle", function(value)
    local result = Server.Bridge.Vehicles.Get(value)
    return result
end)

---@param data table
exports("SaveVehicle", function(data)
    local result = Server.Bridge.Vehicles.Save(data)
    return result
end)