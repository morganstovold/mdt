local QBCore = exports['qb-core']:GetCoreObject()

<<<<<<< HEAD
-- region Auth Module

---@param source number
---@diagnostic disable-next-line: duplicate-set-field
=======
-- region PreChecks

function Server.Bridge.hireOfficers()
    local jobs = '"' .. table.concat(Config.jobs, '", "') .. '"'
    local query = [[
        SELECT * FROM players
        WHERE JSON_EXTRACT(job, "$.name") IN (]] .. jobs .. [[)
        AND citizenid NOT IN (
            SELECT identifier FROM mdt_roster
        )
    ]]

    local results = MySQL.query.await(query)

    for i = 1, #results do
        local officer = results[i]
        local job = json.decode(officer.job)
        local metadata = json.decode(officer.metadata)

        local data = {
            citizenid = officer.citizenid,
            callsign = type(metadata.callsign) == 'number' and metadata.callsign or 0,
            department = "lspd",
            rank = job.grade.level,
            certs = {},
            checklist = {},
            hiredBy = 0,
            noEntry = true,
        }

        Server.Bridge.Roster.Save(data)
    end
end

RegisterNetEvent('QBCore:Server:OnJobUpdate')
AddEventHandler('QBCore:Server:OnJobUpdate', function(source, job)
    if IsAuthorized(job.name) then
        QBCore.Player.Save(source)
        Server.Bridge.hireOfficers()
    end
end)

RegisterCommand("hireOfficers", function(source, args)
    Server.Bridge.hireOfficers()
end, true)

-- endregion PreChecks

-- region Auth Module

---@param source number
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Auth.Load(source)
    local user = QBCore.Functions.GetPlayer(source)
    if not user then return { error = true } end

<<<<<<< HEAD
    local reports = {}
    local department = 'lspd'
    local rank = user.PlayerData.job.grade.level
    local callsign = "0"
    if user.PlayerData.job.name == "police" then
        local officer = Server.Bridge.Roster.Get(user.PlayerData.citizenid)

        if officer then
            department = officer.department
            callsign = officer.callsign
        end
    end



    return {
=======
    if not IsAuthorized(user.PlayerData.job.name) then
        Shared:print("Unauthorized access attempt by " ..
            user.PlayerData.charinfo.firstname ..
            " " .. user.PlayerData.charinfo.lastname .. " (" .. user.PlayerData.citizenid .. ")")
        return {
            language = Shared.language,
            authorized = false
        }
    end


    local officer = Server.Bridge.Roster.Get(user.PlayerData.citizenid)
    local reports = Server.Bridge.Reports.Search(user.PlayerData.citizenid, true)
    local charges = Server.Legislation.Get()

    if not officer or not reports or not charges then
        return { status = "error" }
    end

    return {
        authorized = true,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        reports = reports,
        language = Shared.language,
        jobs = Config.jobs,
        templates = Config.templates,
        certs = Config.certs,
        checklist = Config.checklist,
        departments = Config.departments,
<<<<<<< HEAD
=======
        charges = charges,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        user = {
            citizenid = user.PlayerData.citizenid,
            firstname = user.PlayerData.charinfo.firstname,
            lastname = user.PlayerData.charinfo.lastname,
<<<<<<< HEAD
            callsign = callsign,
            department = department,
            rank = rank,
=======
            callsign = officer.callsign or "0",
            department = officer.department or "lspd",
            rank = user.PlayerData.job.grade.level,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        }
    }
end

<<<<<<< HEAD
=======
---@param job string
function IsAuthorized(job)
    for i = 1, #Config.jobs do
        if Config.jobs[i] == job then
            return true
        end
    end

    return false
end

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
-- endregion Auth Module

-- region Profiles Module

---@param value string
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Profiles.Search(value)
    local query = [[
        SELECT
            p.citizenid,
            JSON_VALUE(p.charinfo, '$.firstname') AS firstname,
            JSON_VALUE(p.charinfo, '$.lastname') AS lastname,
            JSON_VALUE(p.charinfo, '$.gender') AS gender,
            JSON_VALUE(p.job, '$.name') AS job,
            JSON_VALUE(p.charinfo, '$.phone') AS phone,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            (CASE WHEN EXISTS (
                SELECT 1
                FROM mdt_reports r
                CROSS JOIN JSON_TABLE(r.offenders, '$[*]' COLUMNS (
<<<<<<< HEAD
                    citizenid INT PATH '$.citizenid',
                    warrantDate DATETIME PATH '$.warrant'
                )) jt
                WHERE r.locked = 0
                AND jt.citizenid = p.citizenid
                AND jt.warrantDate > NOW()
=======
                    citizenid VARCHAR(255) PATH '$.citizenid',
                    warrantDate VARCHAR(255) PATH '$.warrant'
                )) jt
                WHERE r.locked = 0
                AND jt.citizenid = p.citizenid
                AND STR_TO_DATE(SUBSTRING_INDEX(jt.warrantDate, ' ', 5), '%a %b %d %Y') > NOW()
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            ) THEN true ELSE false END) AS hasWarrant
        FROM players p
        LEFT JOIN mdt_users mdp ON p.citizenid = mdp.identifier
        WHERE (LOWER(CONCAT(JSON_VALUE(p.charinfo, '$.firstname'), ' ', JSON_VALUE(p.charinfo, '$.lastname')))) LIKE :query
            OR p.citizenid LIKE :query
<<<<<<< HEAD
            OR lower(JSON_VALUE(p.job, '$.name')) LIKE :query;
=======
            OR lower(JSON_VALUE(p.job, '$.name')) LIKE :query
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    ]]

    local params = {
        query = string.lower('%' .. value .. '%')
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value number
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Profiles.Get(value)
    local query = [[
        SELECT
            p.citizenid,
            JSON_VALUE(p.charinfo, '$.firstname') AS firstname,
            JSON_VALUE(p.charinfo, '$.lastname') AS lastname,
<<<<<<< HEAD
            JSON_VALUE(p.charinfo, '$.birthdate') AS birthdate,
=======
            JSON_VALUE(p.charinfo, '$.birthdate') AS dob,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            JSON_VALUE(p.charinfo, '$.gender') AS gender,
            JSON_VALUE(p.charinfo, '$.phone') AS phone,
            JSON_VALUE(p.job, '$.name') AS job,
            p.metadata,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdp.notes,
            mdp.gallery,
            mdp.updatedAt,
            (
                SELECT JSON_ARRAYAGG(JSON_OBJECT('name', ph.house, 'type', 'house'))
                FROM player_houses ph
                WHERE p.citizenid = ph.citizenid OR JSON_CONTAINS(ph.keyholders, CONCAT('[', CAST(p.citizenid AS CHAR), ']'))
            ) as properties,
            (
                SELECT JSON_ARRAYAGG(JSON_OBJECT('plate', v.plate, 'vehicle', v.vehicle))
                FROM player_vehicles v
                WHERE p.citizenid = v.citizenid
            ) as vehicles,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.id,
                        'title', r.title,
                        'officer', JSON_OBJECT('firstname', IFNULL(JSON_VALUE(oc.charinfo, '$.firstname'), 'unknown'), 'lastname', IFNULL(JSON_VALUE(oc.charinfo, '$.lastname'), 'unknown')),
<<<<<<< HEAD
                        'warrant', CASE WHEN off.warrant IS NOT NULL THEN off.warrant ELSE NULL END,
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                        'charges', IFNULL(off.charges, NULL)
                    )
                )
                FROM mdt_reports r
                LEFT JOIN (
<<<<<<< HEAD
                    SELECT id, officer_id, publisher
                    FROM mdt_reports,
                        JSON_TABLE(officers, "$[*]"
                        COLUMNS (
                            officer_id INT PATH "$.citizenid",
=======
                    SELECT DISTINCT id, officer_id, publisher
                    FROM mdt_reports,
                        JSON_TABLE(officers, "$[*]"
                        COLUMNS (
                            officer_id VARCHAR(50) PATH "$.citizenid",
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                            publisher BOOLEAN PATH "$.publisher"
                        )
                    ) AS json_table2
                ) officers ON r.id = officers.id
                LEFT JOIN players oc ON officers.officer_id = oc.citizenid
                CROSS JOIN JSON_TABLE(r.offenders, '$[*]' COLUMNS (
<<<<<<< HEAD
                    citizenid INT PATH '$.citizenid',
                    warrant INT PATH '$.warrant',
=======
                    citizenid VARCHAR(255) PATH '$.citizenid',
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                    charges JSON PATH '$.charges'
                )) AS off
                WHERE officers.publisher = true
                AND off.citizenid = p.citizenid
            ) AS reports
        FROM players p
        LEFT JOIN mdt_users mdp ON p.citizenid = mdp.identifier
        WHERE p.citizenid = :id
<<<<<<< HEAD
        GROUP BY p.citizenid;
=======
        GROUP BY p.citizenid
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    ]]

    local params = {
        id = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return { error = true }
    end

    if not result.pfp or not result.notes or not result.gallery or not result.updatedAt then
        result.notes = ""
        result.gallery = "{}"
        result.updatedAt = os.time()
        result.noEntry = true
    end

    result.licenses = Server.Bridge.Utils.FormatLicenses(json.decode(result.metadata).licences) or {}
    result.gallery = json.decode(result.gallery) or {}
    result.properties = json.decode(result.properties) or {}
    result.vehicles = json.decode(result.vehicles) or {}
    result.reports = json.decode(result.reports) or {}

    local convictions = {}
<<<<<<< HEAD
    for _, report in pairs(result.reports) do
        local charges = json.decode(report.charges) or {}
        for _, charge in pairs(charges) do
            local found = false

            for _, conviction in pairs(convictions) do
=======
    for i = 1, #result.reports do
        local report = result.reports[i]
        local charges = json.decode(report.charges) or {}
        for j = 1, #charges do
            local charge = charges[j]
            local found = false

            for k = 1, #convictions do
                local conviction = convictions[k]
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                if conviction.charge.id == charge.id then
                    conviction.count = conviction.count + charge.count
                    found = true
                    break
                end
            end

            if not found then
<<<<<<< HEAD
                table.insert(convictions, {
                    charge = charge.charge,
                    count = charge.count
                })
=======
                convictions[#convictions + 1] = {
                    charge = charge.charge,
                    count = charge.count
                }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            end
        end
    end

    result.convictions = convictions

    return result
end

<<<<<<< HEAD
exports('GetProfile', Server.Bridge.Profiles.Get)

---@param value table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Profiles.Save(value)
    if not value.id then return { error = true } end

    Shared:print('[PROFILES] Saving profile for citizenid: ' .. value.id)

=======
---@param value table
function Server.Bridge.Profiles.Save(value)
    if not value.id then return { error = true } end

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    local queries = {}

    if value.licenses then
        local query = "UPDATE players SET metadata = JSON_SET(metadata"
        local params = {
            id = value.id
        }

        for k, v in pairs(value.licenses) do
            query = query .. ", '$.licences." .. v.name .. "', " .. (v.active and 'true' or 'false')
        end

        query = query .. ") WHERE citizenid = :id;"

<<<<<<< HEAD
        table.insert(queries, {
            query = query,
            values = params
        })
=======
        queries[#queries + 1] = {
            query = query,
            values = params
        }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    end

    local fields = {}
    local params = { id = value.id }

    for k, v in pairs(value) do
        if k ~= 'id' and k ~= 'licenses' and k ~= 'noEntry' then
<<<<<<< HEAD
            table.insert(fields, k .. ' = :' .. k)
=======
            fields[#fields + 1] = k .. ' = :' .. k
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            params[k] = type(v) == 'table' and json.encode(v) or v
        end
    end

<<<<<<< HEAD
    table.insert(queries, {
        query = value.noEntry and [[
            INSERT IGNORE INTO mdt_users (identifier, pfp, notes, gallery, updatedAt)
            VALUES (:id, :pfp, :notes, :gallery, :updatedAt)
=======
    if next(fields) ~= nil then
        queries[#queries + 1] = {
            query = value.noEntry and [[
            INSERT IGNORE INTO mdt_users (identifier, pfp, notes, gallery)
            VALUES (:id, :pfp, :notes, :gallery)
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        ]] or [[
            UPDATE mdt_users
            SET ]] .. table.concat(fields, ', ') .. [[
            WHERE identifier = :id
        ]],
<<<<<<< HEAD
        values = params
    })
=======
            values = params
        }
    end
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

    local success = MySQL.transaction.await(queries)

    return success and {} or { error = true }
end

-- endregion Profiles Module

<<<<<<< HEAD
-- region Roster Module

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
=======
-- region Reports Module

---@param value string
---@param recent? boolean
function Server.Bridge.Reports.Search(value, recent)
    local query = [[
        SELECT
            mr.id,
            mr.title,
            mr.locked,
            mr.type,
            IFNULL(pc2.citizenid, 'unknown') as citizenid,
            IFNULL(JSON_VALUE(pc2.charinfo, '$.firstname'), 'unknown') as firstname,
            IFNULL(JSON_VALUE(pc2.charinfo, '$.lastname'), 'unknown') as lastname,
            IFNULL(mr2.callsign, 'unknown') as callsign,
            mr.createdAt
        FROM mdt_reports mr
        LEFT JOIN players pc1 ON JSON_VALUE(mr.offenders, '$[0].citizenid') = pc1.citizenid
        LEFT JOIN players pc2 ON JSON_VALUE(mr.officers, '$[0].citizenid') = pc2.citizenid AND JSON_VALUE(mr.officers, '$[0].publisher') = true
        LEFT JOIN mdt_roster mr2 ON pc2.citizenid = mr2.identifier
    ]]

    if recent then
        query = query .. [[
            ORDER BY mr.id DESC
            LIMIT 20
        ]]
    else
        query = query .. [[
            WHERE (
                mr.id LIKE :id OR
                mr.title LIKE :query OR (
                    pc1.citizenid LIKE :id OR
                    JSON_VALUE(pc1.charinfo, '$.firstname') LIKE :query OR
                    JSON_VALUE(pc1.charinfo, '$.lastname') LIKE :query OR
                    pc2.citizenid LIKE :id OR
                    JSON_VALUE(pc2.charinfo, '$.firstname') LIKE :query OR
                    JSON_VALUE(pc2.charinfo, '$.lastname') LIKE :query
                )
            )
        ]]
    end

    local params = {
        id = value,
        query = string.lower('%' .. value .. '%')
    }

    -- Execute the query and return the results.
    local results = MySQL.query.await(query, params)

    return results
end

---@param value number
function Server.Bridge.Reports.Get(value)
    local query = [[
        SELECT
            mr.id,
            mr.locked,
            mr.title,
            mr.type,
            mr.notes,
            mr.gallery,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'citizenid', IFNULL(pc1.citizenid, 'unknown'),
                        'firstname', IFNULL(JSON_VALUE(pc1.charinfo, '$.firstname'), 'unknown'),
                        'lastname', IFNULL(JSON_VALUE(pc1.charinfo, '$.lastname'), 'unknown'),
                        'charges', offender.charges,
                        'warrant', offender.warrant
                    )
                ) FROM mdt_reports r
                LEFT JOIN (
                    SELECT id, offender_id, charges, warrant
                    FROM mdt_reports,
                        JSON_TABLE(offenders, "$[*]"
                        COLUMNS (
                            offender_id VARCHAR(50) PATH "$.citizenid",
                            charges JSON PATH "$.charges",
                            warrant VARCHAR(255) PATH "$.warrant"
                        ) ) AS json_table1
                ) offender ON mr.id = offender.id
                LEFT JOIN players pc1 ON offender.offender_id = pc1.citizenid
                WHERE r.id = mr.id
            ) as offenders,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'citizenid', IFNULL(pc2.citizenid, 'unknown'),
                        'firstname', IFNULL(JSON_VALUE(pc2.charinfo, '$.firstname'), 'unknown'),
                        'lastname', IFNULL(JSON_VALUE(pc2.charinfo, '$.lastname'), 'unknown'),
                        'callsign', mr2.callsign,
                        'rank', JSON_VALUE(pc2.job, '$.grade.level'),
                        'publisher', IFNULL(officer.publisher, false)
                    )
                ) FROM mdt_reports r
                LEFT JOIN (
                    SELECT id, officer_id, publisher
                    FROM mdt_reports,
                        JSON_TABLE(officers, "$[*]"
                    COLUMNS (
                        officer_id VARCHAR(50) PATH "$.citizenid",
                        publisher BOOLEAN PATH "$.publisher"
                    )) AS json_table2
                ) officer ON mr.id = officer.id
                LEFT JOIN players pc2 ON officer.officer_id = pc2.citizenid
                LEFT JOIN mdt_roster mr2 ON pc2.citizenid = mr2.identifier
                WHERE r.id = mr.id
            ) as officers
        FROM mdt_reports mr
        WHERE mr.id = :id
        GROUP BY mr.id
    ]]

    local params = {
        id = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return { error = true }
    end

    if result then
        local offenders = {}
        result.offenders = json.decode(result.offenders)
        for i = 1, #result.offenders do
            local offender = result.offenders[i]
            if offender.firstname == 'unknown' or offender.lastname == 'unknown' or offender.citizenid == 'unknown' then goto continue end

            offender.charges = json.decode(offender.charges)
            table.insert(offenders, offender)

            ::continue::
        end

        result.offenders = offenders
        result.officers = json.decode(result.officers)
        result.gallery = json.decode(result.gallery)
    end

    return result
end

---@param data table
function Server.Bridge.Reports.Save(data)
    local insert_query = [[
        INSERT INTO mdt_reports (locked, title, type, notes, offenders, officers, gallery)
        VALUES (:locked, :title, :type, :notes, :offenders, :officers, :gallery)
    ]]
    local update_query = [[
        UPDATE mdt_reports
        SET locked = :locked,
        title = :title,
        type = :type,
        notes = :notes,
        offenders = :offenders,
        officers = :officers,
        gallery = :gallery
        WHERE id = :id
    ]]

    local query = insert_query
    local fields = {}
    local params = {}

    for k, v in pairs(data) do
        if k ~= 'id' then
            table.insert(fields, k .. ' = :' .. k)
            params[k] = type(v) == 'table' and json.encode(v) or v
            if type(v) == 'table' then
                if k == 'offenders' then
                    for i, offender in ipairs(v) do
                        if offender.warrant then
                            local warrantDate = string.match(offender.warrant, "(.*) GMT")
                            offender.warrant = warrantDate
                        end
                    end
                end
                params[k] = json.encode(v)
            else
                params[k] = v
            end
        end
    end

    if data.id ~= "new" then
        query = update_query
        params.id = data.id
    end

    local result = MySQL.query.await(query, params)

    if result.affectedRows == 0 then
        return { error = true }
    end

    return {
        id = result.insertId
    }
end

-- endregion Reports Module

-- region Vehicles Module

---@param value string
function Server.Bridge.Vehicles.Search(value)
    local query = [[
        SELECT
            v.id,
            v.plate,
            v.vehicle as model,
            IFNULL(JSON_VALUE(p.charinfo, '$.firstname'), 'unknown') as firstname,
            IFNULL(JSON_VALUE(p.charinfo, '$.lastname'), 'unknown') as lastname
        FROM player_vehicles v
        LEFT JOIN players p ON v.citizenid = p.citizenid
        WHERE v.id LIKE :query
            OR v.plate LIKE :query
            OR v.vehicle LIKE :query
            OR JSON_VALUE(p.charinfo, '$.firstname') LIKE :query
            OR JSON_VALUE(p.charinfo, '$.lastname') LIKE :query
    ]]

    local params = {
        query = string.lower('%' .. value .. '%')
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value string
function Server.Bridge.Vehicles.Get(value)
    local query = [[
        SELECt
            v.id,
            v.plate,
            v.vehicle as model,
            IFNULL(p.citizenid, 'unknown') as citizenid,
            IFNULL(JSON_VALUE(p.charinfo, '$.firstname'), 'unknown') as firstname,
            IFNULL(JSON_VALUE(p.charinfo, '$.lastname'), 'unknown') as lastname,
            IFNULL(JSON_VALUE(p.charinfo, '$.gender'), 'unknown') as gender,
            IFNULL(JSON_VALUE(p.job, '$.name'), 'unknown') as job,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdv.notes,
            mdv.gallery,
            mdv.updatedAt
        FROM player_vehicles v
        LEFT JOIN players p ON v.citizenid = p.citizenid
        LEFT JOIN mdt_users mdp ON p.citizenid = mdp.identifier
        LEFT JOIN mdt_vehicles mdv ON v.plate = mdv.identifier
        WHERE v.id = :id
    ]]

    local params = {
        id = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return { error = true }
    end

    result.gallery = json.decode(result.gallery) or {}

    return result
end

---@param value table
function Server.Bridge.Vehicles.Save(value)
    local update_query = [[
        UPDATE mdt_vehicles
            SET notes = :notes,
            gallery = :gallery,
            updatedAt = :updatedAt
        WHERE identifier = :id
    ]]
    local insert_query = [[
        INSERT INTO mdt_vehicles (identifier, notes, gallery)
        VALUES (:id, :notes, :gallery)
    ]]

    if not value.id then return { error = true } end

    local params = {
        id = value.id,
        notes = value.notes,
        gallery = json.encode(value.gallery),
    }
    local result = MySQL.query.await(update_query, params)

    if result.affectedRows == 0 then
        local insert_result = MySQL.query.await(insert_query, params)

        if insert_result.affectedRows == 0 then
            return { error = true }
        end
    end

    return {}
end

-- endregion Vehicles Module

-- region Roster Module

---@param value string
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Roster.Search(value)
    local jobs = '"' .. table.concat(Config.jobs, '", "') .. '"'
    local query = [[
        SELECT
            p.citizenid,
            JSON_VALUE(p.charinfo, '$.firstname') AS firstname,
            JSON_VALUE(p.charinfo, '$.lastname') AS lastname,
            JSON_VALUE(p.charinfo, '$.phone') AS phone,
            JSON_VALUE(p.job, '$.grade.level') AS rank,
            mdo.callsign,
            mdo.department,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdo.createdAt AS time
        FROM players p
        LEFT JOIN mdt_users mdp ON p.citizenid = mdp.identifier
        LEFT JOIN mdt_roster mdo ON p.citizenid = mdo.identifier
        WHERE (p.citizenid = :citizenid
            OR (LOWER(CONCAT(JSON_VALUE(p.charinfo, '$.firstname'), ' ', JSON_VALUE(p.charinfo, '$.lastname')))) LIKE :query
            OR mdo.callsign LIKE :query
            OR mdo.department LIKE :query)
        AND lower(JSON_VALUE(p.job, '$.name')) IN (]] .. jobs .. [[)
    ]]



    local params = {
        citizenid = value,
        query = string.lower('%' .. value .. '%')
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value string
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Roster.Get(value)
    local query = [[
        SELECT
            p.citizenid,
            JSON_VALUE(p.charinfo, '$.firstname') AS firstname,
            JSON_VALUE(p.charinfo, '$.lastname') AS lastname,
            JSON_VALUE(p.charinfo, '$.phone') AS phone,
            JSON_VALUE(p.job, '$.grade.level') AS rank,
            mdo.callsign,
            mdo.department,
            mdo.certs,
            mdo.checklist,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdo.createdAt AS time,
            mdo.updatedAt,
<<<<<<< HEAD
            JSON_OBJECT('pfp', op.pfp, 'citizenid', o.citizenid, 'firstname', JSON_VALUE(o.charinfo, '$.firstname'), 'lastname', JSON_VALUE(p.charinfo, '$.lastname'), 'callsign', opp.callsign, 'department', opp.department, 'rank', JSON_VALUE(p.job, '$.grade.level')) AS hiredBy,
=======
            JSON_OBJECT('pfp', op.pfp, 'citizenid', IFNULL(o.citizenid, mdo.hiredBy), 'firstname', JSON_VALUE(o.charinfo, '$.firstname'), 'lastname', JSON_VALUE(o.charinfo, '$.lastname'), 'callsign', opp.callsign, 'department', opp.department, 'rank', JSON_VALUE(o.job, '$.grade.level')) AS hiredBy,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.id,
                        'title', r.title
                    )
                )
                FROM mdt_reports r
                LEFT JOIN players oc ON JSON_EXTRACT(r.officers, '$[0].citizenid') = oc.citizenid
                WHERE JSON_EXTRACT(r.officers, '$[0].citizenid') = p.citizenid
                AND JSON_EXTRACT(r.officers, '$[0].publisher') = true
            ) AS reports
        FROM players p
        LEFT JOIN mdt_users mdp ON p.citizenid = mdp.identifier
        LEFT JOIN mdt_roster mdo ON p.citizenid = mdo.identifier
        LEFT JOIN players o ON mdo.hiredBy = o.citizenid
        LEFT JOIN mdt_users op ON o.citizenid = op.identifier
        LEFT JOIN mdt_roster opp ON o.citizenid = opp.identifier
        WHERE p.citizenid = :citizenid
    ]]

    local params = {
        citizenid = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return {
            error = true
        }
    end

    result.certs = json.decode(result.certs) or {}
    result.checklist = json.decode(result.checklist) or {}
    result.hiredBy = json.decode(result.hiredBy)
    result.reports = json.decode(result.reports) or {}

    return result
end

---@param value table
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Roster.Save(value)
    if not value.citizenid then
        return {
            error = true
        }
    end
    local user = QBCore.Functions.GetPlayerByCitizenId(value.citizenid)
    if not user then
        user = QBCore.Functions.GetOfflinePlayerByCitizenId(value.citizenid)
    end
    if not user then
        return {
            error = true
        }
    end
    local queries = {}

    if value.rank ~= nil and not value.noEntry then
        user.Functions.SetJob('police', value.rank)
    end

    local fields = {}
    local params = {
        citizenid = value.citizenid
    }

    for k, v in pairs(value) do
        if k ~= 'citizenid' and k ~= 'rank' then
<<<<<<< HEAD
            table.insert(fields, k .. ' = :' .. k)
=======
            fields[#fields + 1] = k .. ' = :' .. k
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            params[k] = type(v) == 'table' and json.encode(v) or v
        end
    end

    if value.noEntry then
<<<<<<< HEAD
        table.insert(queries, {
=======
        queries[#queries + 1] = {
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            query = [[
                INSERT IGNORE INTO mdt_roster (identifier, department, certs, checklist, callsign, hiredBy)
                VALUES (:citizenid, :department, :certs, :checklist, :callsign, :hiredBy)
            ]],
            values = params
<<<<<<< HEAD
        })
=======
        }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

        user.Functions.SetJob('police', value.rank)
    else
        if #fields > 0 then
<<<<<<< HEAD
            table.insert(queries, {
=======
            queries[#queries + 1] = {
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                query = [[
                    UPDATE mdt_roster
                    SET ]] .. table.concat(fields, ', ') .. [[
                    WHERE identifier = :citizenid
                ]],
                values = params
<<<<<<< HEAD
            })
=======
            }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        end
    end

    local success = MySQL.transaction.await(queries)

<<<<<<< HEAD
    Shared:print('[ROSTER] Saved row for citizenid: ' .. value.citizenid, success and 'success' or 'error')

=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    return success and {} or {
        error = true
    }
end

<<<<<<< HEAD
---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Roster.Fire(value)
    local queries = {}

    table.insert(queries, {
=======
RegisterCommand("hireOfficer", function(source, args)
    local cid = args[1]
    if not cid then return end

    local query = [[
        SELECT * from players WHERE citizenid = :citizenid
    ]]

    local result = MySQL.single.await(query, { citizenid = cid })
    if not result then return Shared:print("Player not found") end

    local job = json.decode(result.job)
    local metadata = json.decode(result.metadata)

    local data = {
        citizenid = result.citizenid,
        callsign = type(metadata.callsign) == 'number' and metadata.callsign or 0,
        department = "lspd",
        rank = job.grade.level,
        certs = {},
        checklist = {},
        hiredBy = 0,
        noEntry = true,
    }

    Server.Bridge.Roster.Save(data)

    Shared:print("Hired " .. result.firstname .. " " .. result.lastname)
end, true)

---@param value string
function Server.Bridge.Roster.Fire(value)
    local queries = {}

    queries[#queries + 1] = {
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        query = [[
            DELETE FROM mdt_roster
            WHERE identifier = :citizenid
        ]],
        values = {
            citizenid = value
        }
<<<<<<< HEAD
    })
=======
    }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

    local user = QBCore.Functions.GetPlayerByCitizenId(value)
    if not user then
        user = QBCore.Functions.GetOfflinePlayerByCitizenId(value)
    end
    if not user then
        return {
            error = true
        }
    end
    user.Functions.SetJob('unemployed', 0)

    local success = MySQL.transaction.await(queries)

    return success and {} or {
        error = true
    }
end

-- endregion Roster Module

-- region Utils Module

---@param licenses table
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Utils.FormatLicenses(licenses)
    -- -> {"driver":true,"weapon":false}
    -- -> {{name: 'driver', active: true}, {name: 'weapon', active: false}}
    local formatted

    for k, v in pairs(licenses) do
        if not formatted then
            formatted = {}
        end

        table.insert(formatted, {
            name = k,
            active = v
        })
=======
function Server.Bridge.Utils.FormatLicenses(licenses)
    -- -> {"driver":true,"weapon":false}
    -- -> {{name: 'driver', active: true}, {name: 'weapon', active: false}}
    local formatted = {}

    for k, v in pairs(licenses) do
        formatted[#formatted + 1] = {
            name = k,
            active = v
        }
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    end

    return formatted
end

---@param licenses table
<<<<<<< HEAD
---@diagnostic disable-next-line: duplicate-set-field
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
function Server.Bridge.Utils.UnFormatLicenses(licenses)
    -- -> {{name: 'driver', active: true}, {name: 'weapon', active: false}}
    -- -> {"driver":true,"weapon":false}
    local formatted = {}

<<<<<<< HEAD
    for _, v in pairs(licenses) do
=======
    for k, v in ipairs(licenses) do
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        formatted[v.name] = v.active
    end

    return formatted
end

-- endregion Utils Module
