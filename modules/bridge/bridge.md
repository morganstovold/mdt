# MDT Bridge Guide

## This guide will use the framework name `custom` for the sake of simplicity. Replace `custom` with your frameworks name when following this guide.

## Step 1: Create the new bridge folder
You can do this one of two ways: First you could copy the current `qb` folder and rename it to your frameworks name and proceed to step 2. Or you could create a new folder and copy the contents of the `qb` folder into it. Either way, you should end up with a folder structure that looks like this:
```
├── bridge
│   ├── qb
│       ...
│   ├── custom
│       ...
│   ├── cl_bridge.lua
│   ├── sv_bridge.lua
```

## Step 2: Edit the bridge files
Under the `custom` folder, open `cl_bridge.lua` and `sv_bridge.lua` and go through the files, converting functions that are specific to qbcore into your desired framework.

## Step 3: Edit the config file
Open `config.lua` and change the `framework` variable to your frameworks name. In this case, it would be `custom`.

## Step 4: Restart Server or ensure mdt