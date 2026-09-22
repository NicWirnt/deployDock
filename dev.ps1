param([ValidateSet('dev','build','start','typecheck','lint','install')][string]$Task = 'dev')
$ErrorActionPreference = 'Stop'
$env:PATH = 'D:\Nico\DeployDock-Work\tools\node-v24.21.0-win-x64;' + $env:PATH
$env:TEMP = 'D:\Nico\DeployDock-Work\temp'
$env:TMP = $env:TEMP
$env:npm_config_cache = 'D:\Nico\DeployDock-Work\npm-cache'
$env:NEXT_TELEMETRY_DISABLED = '1'
Push-Location $PSScriptRoot
try { & pnpm $Task; if ($LASTEXITCODE -ne 0) { throw "pnpm $Task failed: $LASTEXITCODE" } } finally { Pop-Location }
