# MDT Installation Guide
## Step 1: Install the MDT Resource
First, place the entire mdt folder into your server resources folder. Then, start the resource by adding `ensure mdt` to your server configuration file (e.g. `server.cfg`).

## Step 2: Hire Officers
The MDT has its own added logic and data that is not present in the default QBCore police job. Because of this, you need to hire officers through the MDT. After installing this resource you will have to hire all current officers or you will be presented with a page load error when trying to load the officers rosters profile, run the command `hireOfficers` to hire all default officers. From now on new officers should be hired through the mdt or by the `hireOfficer` command.

## That's it! Your FiveM MDT is now installed and ready to use :] 
Additional guides and information can be found below.

## Default legislation
If you want to load a set of default legislation data, run the command `defaultCharges` in your console. `mdt/defaultCharges.json`

## Framework Integration
The MDT comes pre-configured for QBCore, but because of the bridge system it can be converted to any framework with ease. In the future an ESX bridge along with a custom framework template will be provided.

## Additional Configurations
The MDT is almost completly drag and drop, additional configuration can be done through the `mdt/config.lua` file.