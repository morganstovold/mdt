local scriptPath = ('modules/bridge/%s/client.lua'):format(Shared.framework)
local resourceFile = LoadResourceFile(Shared.resource, scriptPath)

if not resourceFile then return error('Failed to load bridge script for framework: ' .. Shared.framework) end

local func, err = load(resourceFile, ("@@%s/%s"):format(Shared.resource, scriptPath))

if not func or err then return error(err) end

func()
