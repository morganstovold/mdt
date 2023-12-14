OnEvent("auth:load", function(source, resp, data)
    local result = Server.Bridge.Auth.Load(source)
    resp(result)
end)