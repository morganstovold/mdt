<<<<<<< HEAD
-- Dont touch anything below this line
--- @todo fine tune this
Server.DB = {
    Tables = {}, -- A Lua table to keep track of created tables
=======
Server.DB = {
    Tables = {},
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    Table = function(self, name, columns, errorCallback, params)
        columns = columns ..
            ', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'

        MySQL.query(string.format('CREATE TABLE IF NOT EXISTS %s (%s)', name, columns), params, function(result)
            Shared:print(('Table %s'):format(name))
            table.insert(self.Tables, name)
        end)
    end,
}
