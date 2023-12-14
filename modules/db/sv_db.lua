Server.DB = {
    Tables = {},
    Table = function(self, name, columns, errorCallback, params)
        columns = columns ..
            ', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'

        MySQL.query(string.format('CREATE TABLE IF NOT EXISTS %s (%s)', name, columns), params, function(result)
            Shared:print(('Table %s'):format(name))
            table.insert(self.Tables, name)
        end)
    end,
}
