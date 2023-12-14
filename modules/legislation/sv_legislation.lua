Server.DB:Table("mdt_charges",
    "id INT NOT NULL AUTO_INCREMENT, " ..
    "title LONGTEXT DEFAULT NULL, " ..
    "description LONGTEXT DEFAULT NULL, " ..
    "fine VARCHAR(255) DEFAULT NULL, " ..
    "months VARCHAR(255) DEFAULT NULL, " ..
    "type VARCHAR(255) DEFAULT NULL, " ..
    "PRIMARY KEY (id), " ..
    "KEY id (id)"
)

---@param source number
---@param resp function
---@param data string
OnEvent("legislation:get", function(source, resp, data)
    local result = Server.Legislation.Get()
    resp(result)
end)

---@param source number
---@param resp function
---@param data table
OnEvent("legislation:save", function(source, resp, data)
    local result = Server.Legislation.Save(data)
    resp(result)
end)

---@return table
function Server.Legislation.Get()
    local query = [[
        SELECT * FROM mdt_charges
    ]]

    local result = MySQL.query.await(query)

    return result
end

---@param data table
function Server.Legislation.Save(data)
    local replace_query = [[
        REPLACE INTO mdt_charges (id, title, description, fine, months, type)
        VALUES (@id, @title, @description, @fine, @months, @type)
    ]]
    local delete_query = [[
        DELETE FROM mdt_charges
        WHERE id = @id
    ]]

    local queries = {}
    for _, charge in ipairs(data) do
        if charge.removed then
            table.insert(queries, { query = delete_query, values = charge })
        else
            table.insert(queries, { query = replace_query, values = charge })
        end
    end

    local success = MySQL.transaction.await(queries)

    return success and {} or { error = true }
end