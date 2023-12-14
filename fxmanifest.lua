---@diagnostic disable: undefined-global
fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'mdt'
author 'Left#2118'

dependencies { 'oxmysql' }

ui_page './web/dist/index.html'

files {
    './web/dist/index.html',
    './web/dist/assets/*',
    './data/*',
    './modules/bridge/**/client.lua',
}

shared_scripts {
    './config.lua',
    './lib.lua',
    './modules/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    './modules/db/sv_db.lua',
    './modules/**/sv_*.lua',
}

client_script {
    './modules/**/cl_*.lua',
}

escrow_ignore {
    '**/*'
}
