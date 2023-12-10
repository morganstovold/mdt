-- region Auth Module

---@param source number
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Auth.Load(source)
    local user = exports['moment-framework']:GetCurrentCharacter(source)
    if not user then return { error = true } end

    local reports = Server.Bridge.Reports.Search("", true)
    local department = 'lspd'
    local rank = user.rank
    local callsign = "0"
    if user.job == 'police' then
        local officer = Server.Bridge.Roster.Get(user.id)
        if officer then
            department = officer.department
            callsign = officer.callsign
        end
    end
    if user.job == 'judge' then
        department = 'judge'
        rank = 0
    end
    if user.job == 'districtattorney' then
        department = 'doj'
        rank = 0
    end
    if user.job == 'lawyer' then
        department = 'doj'
        rank = 1
    end
    if user.job == 'countyclerk' then
        department = 'doj'
        rank = 2
    end
    if user.job == 'adistrictattorney' then
        department = 'doj'
        rank = 3
    end
    if user.job == 'mayor' then
        department = 'doj'
        rank = 4
    end
    if user.job == 'lawyer' then
        department = 'doj'
        rank = 5
    end

    return {
        reports = reports,
        language = Shared.language,
        jobs = Config.jobs,
        templates = Config.templates,
        certs = Config.certs,
        checklist = Config.checklist,
        departments = Config.departments,
        user = {
            citizenid = user.id,
            firstname = user.first_name,
            lastname = user.last_name,
            callsign = callsign,
            department = department,
            rank = rank
        }
    }
end

-- endregion

-- region Profiles Module

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Profiles.Search(value)
    local query = [[
        SELECT
            p.id AS citizenid,
            p.first_name AS firstname,
            p.last_name AS lastname,
            p.gender,
            p.job,
            p.phone_number AS phone,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            (CASE WHEN EXISTS (
                SELECT 1
                FROM mdt_reports r
                CROSS JOIN JSON_TABLE(r.offenders, '$[*]' COLUMNS (
                    citizenid INT PATH '$.citizenid',
                    warrantDate DATETIME PATH '$.warrant'
                )) jt
                WHERE r.locked = 0
                AND jt.citizenid = p.id
                AND jt.warrantDate > NOW()
            ) THEN true ELSE false END) AS hasWarrant
        FROM __playercharacters p
        LEFT JOIN mdt_users mdp ON p.id = mdp.identifier
        WHERE (LOWER(CONCAT(p.first_name, ' ', p.last_name))) LIKE :query
            OR p.id = :id
            OR p.job LIKE :query;
    ]]
    local params = {
        id = value,
        query = string.lower('%' .. value .. '%')
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value number
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Profiles.Get(value)
    local query = [[
        SELECT
            p.id AS citizenid,
            p.first_name AS firstname,
            p.last_name AS lastname,
            p.dob,
            p.gender,
            p.phone_number AS phone,
            p.job,
            p.licenses,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdp.notes,
            mdp.gallery,
            mdp.updatedAt,
            (
                SELECT JSON_ARRAYAGG(JSON_OBJECT('name', ph.housename, 'type', 'house'))
                FROM playerhouses ph
                WHERE p.id = ph.cid OR JSON_CONTAINS(ph.keys, CONCAT('[', CAST(p.id AS CHAR), ']'))
            ) as properties,
            (
                SELECT JSON_ARRAYAGG(JSON_OBJECT('plate', v.license_plate, 'vehicle', v.model))
                FROM __playercars v
                WHERE p.id = v.cid
            ) as vehicles,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.id,
                        'title', r.title,
                        'officer', JSON_OBJECT('firstname', IFNULL(oc.first_name, 'unknown'), 'lastname', IFNULL(oc.last_name, 'unknown')),
                        'warrant', CASE WHEN off.warrant IS NOT NULL THEN off.warrant ELSE NULL END,
                        'charges', IFNULL(off.charges, NULL)
                    )
                )
                FROM mdt_reports r
                LEFT JOIN (
                    SELECT id, officer_id, publisher
                    FROM mdt_reports,
                        JSON_TABLE(officers, "$[*]"
                        COLUMNS (
                            officer_id INT PATH "$.citizenid",
                            publisher BOOLEAN PATH "$.publisher"
                        )
                    ) AS json_table2
                ) officers ON r.id = officers.id
                LEFT JOIN __playercharacters oc ON officers.officer_id = oc.id
                CROSS JOIN JSON_TABLE(r.offenders, '$[*]' COLUMNS (
                    citizenid INT PATH '$.citizenid',
                    warrant INT PATH '$.warrant',
                    charges JSON PATH '$.charges'
                )) AS off
                WHERE officers.publisher = true
                AND off.citizenid = p.id
            ) AS reports
        FROM __playercharacters p
        LEFT JOIN mdt_users mdp ON p.id = mdp.identifier
        WHERE p.id = :id
        GROUP BY p.id;
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

    result.licenses = Server.Bridge.Utils.FormatLicenses(json.decode(result.licenses)) or {}
    result.gallery = json.decode(result.gallery) or {}
    result.properties = json.decode(result.properties) or {}
    result.vehicles = json.decode(result.vehicles) or {}
    result.reports = json.decode(result.reports) or {}

    local convictions = {}
    for _, report in pairs(result.reports) do
        local charges = json.decode(report.charges) or {}
        for _, charge in pairs(charges) do
            local found = false

            for _, conviction in pairs(convictions) do
                if conviction.charge.id == charge.id then
                    conviction.count = conviction.count + charge.count
                    found = true
                    break
                end
            end

            if not found then
                table.insert(convictions, {
                    charge = charge.charge,
                    count = charge.count
                })
            end
        end
    end

    result.convictions = convictions

    return result
end

exports('GetProfile', Server.Bridge.Profiles.Get)

---@param value table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Profiles.Save(value)
    if not value.id then return { error = true } end
    local update_licenses = [[
        UPDATE __playercharacters
        SET licenses = :licenses
        WHERE id = :id
    ]]
    local insert_query = [[
        INSERT INTO mdt_users (identifier, pfp, notes, gallery)
        VALUES (:id, :pfp, :notes, :gallery)
    ]]


    if value.licenses then
        local params = {
            id = value.id,
            licenses = json.encode(Server.Bridge.Utils.UnFormatLicenses(value.licenses))
        }

        local result = MySQL.query.await(update_licenses, params)

        if result.affectedRows == 0 then
            return { error = true }
        end
    end

    local query = insert_query
    local fields = {}
    local params = { id = value.id }

    for k, v in pairs(value) do
        if k ~= 'id' and k ~= 'licenses' then
            table.insert(fields, k .. ' = :' .. k)
            params[k] = type(v) == 'table' and json.encode(v) or v
        end
    end

    local update_query = [[
        UPDATE mdt_users
        SET ]] .. table.concat(fields, ', ') .. [[
        WHERE identifier = :id
    ]]

    if #fields <= 0 then return {} end

    if not value.noEntry then
        query = update_query
    end

    local result = MySQL.query.await(query, params)

    if result.affectedRows == 0 then
        return { error = true }
    end

    return {}
end

---@param licenses table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Utils.FormatLicenses(licenses)
    -- -> {drift: 0, firearm: 1}
    -- -> {{name: "drift", active: false}, {name: "firearm", active: true}}
    local formatted = {}
    for k, v in pairs(licenses) do
        table.insert(formatted, {
            name = k,
            active = v.status
        })
    end

    return formatted
end

---@param licenses table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Utils.UnFormatLicenses(licenses)
    -- -> {{name: "drift", active: false}, {name: "firearm", active: true}}
    -- -> {drift: 0, firearm: 1}
    local unformatted = {}
    for k, v in pairs(licenses) do
        unformatted[v.name] = { status = (v.active == true and 1 or 0) }
    end

    return unformatted
end

-- endregion

-- region Reports Module

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Reports.Search(value, recent)
    local query = [[
        SELECT DISTINCT mr.id, mr.title, mr.locked, mr.type, IFNULL(pc2.id, 'unknown') AS citizenid, IFNULL(pc2.first_name, 'unknown') as firstname, IFNULL(pc2.last_name, 'unknown') as lastname, IFNULL(mr2.callsign, 'unknown') as callsign, mr.createdAt
            FROM mdt_reports mr
            LEFT JOIN (
                SELECT id, offender_id
                FROM mdt_reports,
                    JSON_TABLE(offenders, "$[*]"
                    COLUMNS (
                        offender_id INT PATH "$.citizenid"
                    )
                ) AS json_table1
            ) o ON mr.id = o.id
            LEFT JOIN __playercharacters pc1 ON o.offender_id = pc1.id
            LEFT JOIN (
                SELECT id, officer_id, publisher
                FROM mdt_reports,
                    JSON_TABLE(officers, "$[*]"
                    COLUMNS (
                        officer_id INT PATH "$.citizenid",
                        publisher BOOLEAN PATH "$.publisher"
                    )
                ) AS json_table2
            ) officers ON mr.id = officers.id
            LEFT JOIN __playercharacters pc2 ON officers.officer_id = pc2.id
            LEFT JOIN mdt_roster mr2 ON pc2.id = mr2.identifier
    ]]

    -- if recent then we need to get the last 20 reports made
    if recent then
        query = query .. [[
            WHERE officers.publisher = true
            ORDER BY mr.id DESC
            LIMIT 20
        ]]
    else
        query = query .. [[
            WHERE officers.publisher = true AND (mr.id LIKE :id OR mr.title LIKE :query OR (
                pc1.id LIKE :query OR
                pc1.first_name LIKE :query OR
                pc1.last_name LIKE :query OR
                pc2.id LIKE :query OR
                pc2.first_name LIKE :query OR
                pc2.last_name LIKE :query
            ))
        ]]
    end

    local params = {
        id = value,
        query = string.lower('%' .. value .. '%')
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value number
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Reports.Get(value)
    local query = [[
        SELECT
            mr.id, mr.locked, mr.title, mr.type, mr.notes, mr.gallery,
            JSON_ARRAYAGG(JSON_OBJECT('citizenid', IFNULL(pc1.id, 'unknown'), 'firstname', IFNULL(pc1.first_name, 'unknown'), 'lastname', IFNULL(pc1.last_name, 'unknown'), 'charges', offender.charges, 'warrant', offender.warrant)) AS offenders,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('citizenid', IFNULL(pc2.id, 'unknown'), 'firstname', IFNULL(pc2.first_name, 'unknown'), 'lastname', IFNULL(pc2.last_name, 'unknown'), 'callsign', mr2.callsign, 'rank', pc2.rank, 'publisher', IFNULL(officer.publisher, false)))
            FROM (
                SELECT mr.id, officer.officer_id, officer.publisher
                FROM mdt_reports mr
                JOIN (
                    SELECT id, officer_id, publisher
                    FROM mdt_reports,
                        JSON_TABLE(officers, "$[*]"
                        COLUMNS (
                            officer_id INT PATH "$.citizenid",
                            publisher BOOLEAN PATH "$.publisher"
                        ) ) AS json_table2
                ) officer ON mr.id = officer.id
                WHERE mr.id = :id
                GROUP BY officer.officer_id, officer.publisher
            ) officer
            LEFT JOIN __playercharacters pc2 ON officer.officer_id = pc2.id
            LEFT JOIN mdt_roster mr2 ON pc2.id = mr2.identifier
        ) AS officers
        FROM mdt_reports mr
        LEFT JOIN (
            SELECT id, offender_id, charges, warrant
            FROM mdt_reports,
                JSON_TABLE(offenders, "$[*]"
                COLUMNS (
                    offender_id INT PATH "$.citizenid",
                    charges JSON PATH "$.charges",
                    warrant BOOLEAN PATH "$.warrant"
                ) ) AS json_table1
        ) offender ON mr.id = offender.id
        LEFT JOIN __playercharacters pc1 ON offender.offender_id = pc1.id
        WHERE mr.id = :id
        GROUP BY mr.id;
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
        for k, v in pairs(json.decode(result.offenders)) do
            if v.firstname == 'unknown' or v.lastname == 'unknown' or v.citizenid == 'unknown' then goto continue end
            v.charges = json.decode(v.charges)
            table.insert(offenders, v)

            ::continue::
        end
        result.offenders = offenders
        result.officers = json.decode(result.officers)
        result.gallery = json.decode(result.gallery)
    end

    return result
end

---@param value table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Reports.Save(value)
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

    for k, v in pairs(value) do
        if k ~= 'id' then
            table.insert(fields, k .. ' = :' .. k)
            params[k] = type(v) == 'table' and json.encode(v) or v
        end
    end

    if value.id ~= "new" then
        query = update_query
        params.id = value.id
    end

    local result = MySQL.query.await(query, params)

    if result.affectedRows == 0 then
        return { error = true }
    end

    return {
        id = result.insertId
    }
end

-- endregion

-- region Vehicles Module

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Vehicles.Search(value)
    local query = [[
        SELECT
            v.id,
            v.license_plate as plate,
            v.name as model,
            IFNULL(p.first_name, 'unknown') AS firstname,
            IFNULL(p.last_name, 'unknown') AS lastname
        FROM __playercars v
        LEFT JOIN __playercharacters p ON v.cid = p.id
        WHERE v.id LIKE :query
        OR LOWER(v.model) LIKE :query
        OR LOWER(v.license_plate) LIKE :query
        OR LOWER(p.first_name) LIKE :query
        OR LOWER(p.last_name) LIKE :query
        OR LOWER(CONCAT(p.first_name, ' ', p.last_name)) LIKE :query
    ]]

    local params = {
        query = string.lower('%' .. value .. '%')
    }

    local result = MySQL.query.await(query, params)

    return result
end

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Vehicles.Get(value)
    local query = [[
        SELECT
            v.id,
            v.license_plate as plate,
            v.name as model,
            IFNULL(p.id, 'unknown') AS citizenid,
            IFNULL(p.first_name, 'unknown') AS firstname,
            IFNULL(p.last_name, 'unknown') AS lastname,
            IFNULL(p.gender, 'unknown'),
            IFNULL(p.job, 'unknown'),
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdv.notes,
            mdv.gallery,
            mdv.updatedAt
        FROM __playercars v
        LEFT JOIN __playercharacters p ON v.cid = p.id
        LEFT JOIN mdt_users mdp ON v.cid = mdp.identifier
        LEFT JOIN mdt_vehicles mdv on v.license_plate = mdv.identifier
        WHERE v.id = :query
    ]]

    local params = {
        query = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return { error = true }
    end

    result.gallery = json.decode(result.gallery) or {}

    return result
end

---@param value table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Vehicles.Save(value)
    local update_query = [[
        UPDATE mdt_vehicles
            SET notes = :notes,
            updatedAt = :updatedAt
        WHERE identifier = :id
    ]]
    local insert_query = [[
        INSERT INTO mdt_vehicles (identifier, notes)
        VALUES (:id, :notes)
    ]]

    if not value.id then return { error = true } end

    local params = {
        id = value.id,
        notes = value.notes,
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

-- endregion

-- region Roster Module

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Roster.Search(value)
    local jobs = '"' .. table.concat(Config.jobs, '", "') .. '"'
    local query = [[
        SELECT
            p.id as citizenid,
            p.first_name as firstname,
            p.last_name as lastname,
            p.phone_number AS phone,
            p.rank,
            mdo.callsign,
            mdo.department,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdo.createdAt AS time
        FROM __playercharacters p
        LEFT JOIN mdt_users mdp ON p.id = mdp.identifier
        LEFT JOIN mdt_roster mdo ON p.id = mdo.identifier
        WHERE (p.id = :id
            OR (LOWER(CONCAT(p.first_name, ' ', p.last_name))) LIKE :query
            OR mdo.callsign LIKE :query
            OR mdo.department LIKE :query)
        AND p.job IN (]] .. jobs .. [[)
    ]]

    local params = {
        id = value,
        query = string.lower('%' .. value .. '%'),
    }

    local results = MySQL.query.await(query, params)

    return results
end

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Roster.Get(value)
    local query = [[
        SELECT
            p.id as citizenid,
            p.first_name as firstname,
            p.last_name as lastname,
            p.phone_number AS phone,
            p.rank,
            mdo.callsign,
            mdo.department,
            mdo.certs,
            mdo.checklist,
            COALESCE(mdp.pfp, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png') AS pfp,
            mdo.createdAt AS time,
            mdo.updatedAt,
            JSON_OBJECT('pfp', op.pfp, 'citizenid', o.id, 'firstname', o.first_name, 'lastname', o.last_name, 'callsign', opp.callsign, 'department', opp.department, 'rank', o.rank) AS hiredBy,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.id,
                        'title', r.title
                    )
                )
                FROM mdt_reports r
                LEFT JOIN __playercharacters oc ON JSON_EXTRACT(r.officers, '$[0].citizenid') = oc.id
                WHERE JSON_EXTRACT(r.officers, '$[0].publisher') = true
                AND JSON_EXTRACT(r.officers, '$[0].citizenid') = p.id -- Added condition here
            ) AS reports
        FROM __playercharacters p
        LEFT JOIN mdt_users mdp ON p.id = mdp.identifier
        LEFT JOIN mdt_roster mdo ON p.id = mdo.identifier
        LEFT JOIN __playercharacters o ON mdo.hiredBy = o.id
        LEFT JOIN mdt_users op ON o.id = op.identifier
        LEFT JOIN mdt_roster opp ON o.id = opp.identifier
        WHERE p.id = :id
    ]]

    local params = {
        id = value
    }

    local result = MySQL.single.await(query, params)

    if not result or not next(result) then
        return { error = true }
    end

    result.certs = json.decode(result.certs) or {}
    result.checklist = json.decode(result.checklist) or {}
    result.hiredBy = json.decode(result.hiredBy)
    result.reports = json.decode(result.reports) or {}

    return result
end

---@param value table
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Roster.Save(value)
    if not value.citizenid then return { error = true } end
    local tUser = exports['moment-framework']:GetUserFromCID(tonumber(value.citizenid))
    local queries = {}

    if value.rank ~= nil and not value.noEntry then
        if tUser and tUser.character then
            exports['moment-framework']:SetRank(tUser.source, value.rank)
        else
            table.insert(queries, {
                query = [[
                    UPDATE __playercharacters
                        SET rank = :rank, job = :job
                    WHERE id = :id
                ]],
                values = {
                    id = value.citizenid,
                    rank = value.rank,
                    job = 'police'
                }
            })
        end
    end

    local fields = {}
    local params = { id = value.citizenid }

    for k, v in pairs(value) do
        if k ~= 'citizenid' and k ~= 'rank' then
            table.insert(fields, k .. ' = :' .. k)
            params[k] = type(v) == 'table' and json.encode(v) or v
        end
    end

    if value.noEntry then
        table.insert(queries, {
            query = [[
                INSERT INTO mdt_roster (identifier, department, certs, checklist, callsign, hiredBy)
                VALUES (:id, :department, :certs, :checklist, :callsign, :hiredBy)
            ]],
            values = params
        })

        if tUser and tUser.character then
            exports['moment-framework']:SetJob(tUser.source, 'offpolice')
            exports['moment-framework']:SetRank(tUser.source, value.rank)
        else
            table.insert(queries, {
                query = [[
                    UPDATE __playercharacters
                        SET rank = :rank, job = :job
                    WHERE id = :id
                ]],
                values = {
                    id = value.citizenid,
                    rank = value.rank,
                    job = 'offpolice'
                }
            })
        end
    else
        if #fields > 0 then
            table.insert(queries, {
                query = [[
                    UPDATE mdt_roster
                    SET ]] .. table.concat(fields, ', ') .. [[
                    WHERE identifier = :id
                ]],
                values = params
            })
        end
    end

    local success = MySQL.transaction.await(queries)

    return success and {} or { error = true }
end

---@param value string
---@diagnostic disable-next-line: duplicate-set-field
function Server.Bridge.Roster.Fire(value)
    local queries = {}

    table.insert(queries, {
        query = [[
            DELETE FROM mdt_roster
            WHERE identifier = :id
        ]],
        values = {
            id = value
        }
    })

    local tUser = exports['moment-framework']:GetUserFromCID(tonumber(value))
    if tUser and tUser.character then
        exports['moment-framework']:SetJob(tUser.source, Config.defaultJob)
        exports['moment-framework']:SetRank(tUser.source, 0)
    else
        table.insert(queries, {
            query = [[
                UPDATE __playercharacters
                    SET rank = :rank, job = :job
                WHERE id = :id
            ]],
            values = {
                id = value,
                rank = 0,
                job = Config.defaultJob
            }
        })
    end

    local success = MySQL.transaction.await(queries)

    return success and {} or { error = true }
end

-- endregion
