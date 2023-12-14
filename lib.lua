local function uuidv4()
    local template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function(c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end

if IsDuplicityVersion() then
    RateLimiter = {
        limits = {},
        limit = 250,

        registerNewEvent = function(event, options)
            RateLimiter.limits[event] = {
                limiters = {},
                options = options
            }
        end,
        isPlayerRateLimited = function(event, src)
            return RateLimiter.limits[event].limiters[src] ~= nil
        end,
        rateLimitPlayer = function(event, src)
            local rateLimiter = RateLimiter.limits[event]
            rateLimiter.limiters[src] = true

            print(json.encode(rateLimiter))

            SetTimeout(rateLimiter.options.limit or RateLimiter.limit, function()
                rateLimiter.limiters[src] = nil
            end)
        end
    }

    --- @param name string
    --- @param cb function
    --- @param rateLimit? number
    function OnEvent(name, cb, rateLimit)
        if rateLimit then
            RateLimiter.registerNewEvent(name, { limit = rateLimit })
        end

        RegisterNetEvent(name)
        AddEventHandler(name, function(respName, ...)
            if not respName or type(respName) ~= 'string' then
                return
            end
            local src = source
            local startTime = GetGameTimer()

            local function promiseResponse(data)
                local endTime = GetGameTimer()
                local diff = endTime - startTime + 0.0
                Shared:print(name .. ' response to ' .. src .. ' in ' .. diff .. 'ms')

                TriggerClientEvent(respName, src, data)
            end

            if rateLimit then
                if RateLimiter.isPlayerRateLimited(name, src) then
                    return promiseResponse({
                        status = "rate_limited",
                        error = true
                    })
                else
                    RateLimiter.rateLimitPlayer(name, src)
                end
            end

            Shared:print(name .. ' called by ' .. src)
            local success, err = pcall(cb, src, promiseResponse, ...)

            if not success then
                Shared:print(name .. ' failed: ' .. err)
                promiseResponse({
                    status = "error",
                    error = err
                })
            end
        end)
    end
else
    function EmitEvent(name, ...)
        local promise = promise.new()
        local id = uuidv4()
        local listener = name .. ":" .. id
        local timeout = false
        local handler

        local function onEventReceived(data)
            RemoveEventHandler(handler)
            if timeout or data.status == "error" then
                promise:reject({ error = true })
            else
                promise:resolve(data)
            end
        end

        -- Timeout function
        local function onTimeout()
            RemoveEventHandler(handler)
            timeout = true
            promise:resolve({ error = true })
        end

        RegisterNetEvent(listener)
        handler = AddEventHandler(listener, onEventReceived)
        TriggerServerEvent(name, listener, ...)
        SetTimeout(15000, onTimeout)

        return Citizen.Await(promise)
    end

    function Method(method, data)
        SendNUIMessage({
            method = method,
            data = data
        })
    end

    function RegisterNuiHandler(name, callback)
        RegisterNUICallback(name, function(data, cb)
            Shared:print("[NUI Handler]: " .. name .. " received")
<<<<<<< HEAD
            local success, err = pcall(callback, data, cb)
            if not success then
                Shared:print("[NUI Handler]: " .. name .. "failed: " .. err)
                cb({ status = "error" })
            end
=======
            local success, rdata = pcall(callback, data)
            if not success or type(rdata) == 'table' and rdata.error then
                Shared:print("[NUI Proxy]: " .. name .. " failed: " .. json.encode(rdata))
                cb({ status = "error" })
                return
            end

            cb({
                status = "ok",
                data = rdata
            })
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        end)
    end

    ---@param name string
    function RegisterNuiProxy(name)
        RegisterNUICallback(name, function(data, cb)
            Shared:print("[NUI Proxy]: " .. name .. " received")
            local success, rdata = pcall(EmitEvent, name, data)
            if not success or rdata.error then
                Shared:print("[NUI Proxy]: " .. name .. " failed: " .. json.encode(rdata))
                cb({ status = "error" })
                return
            end

            cb({
                status = "ok",
                data = rdata
            })
        end)
    end

    -- Utility functions

    function LoadAnim(dict)
        while not HasAnimDictLoaded(dict) do
            RequestAnimDict(dict)
            Wait(10)
        end
    end

    function LoadModel(model)
        while not HasModelLoaded(model) do
            RequestModel(model)
            Wait(10)
        end
    end
end
