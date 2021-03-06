﻿Function UpdateAppSettings {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string]$pathToJson,
        [Parameter(Mandatory = $true)] $inputParams
    )

    $appSettings = Get-Content -Path $pathToJson | ConvertFrom-Json -ErrorAction Stop
    
    # AzureAd settings
    $appSettings.AzureAd.ClientId = $inputParams.ClientId
    $appSettings.AzureAd.ClientSecret = $inputParams.ClientSecret
    $appSettings.AzureAd.TenantId = $inputParams.TenantId
    $appSettings.AzureAd.Audience = $inputParams.ClientId
    $appSettings.AzureAd.Domain = "$($inputParams.TenantName).sharepoint.com"
    $appSettings.AzureAd.Authority = "https://login.microsoftonline.com/$($inputParams.TenantId)"
    $appSettings.AzureAd.BaseUrl = $inputParams.BaseUrl

    # Proposal Management settings
    $appSettings.ProposalManagement.SharePointHostName = $inputParams.SharePointHostName
    $appSettings.ProposalManagement.SharePointSiteRelativeName = $inputParams.SharePointSiteRelativeName

    $appSettings | ConvertTo-Json | Set-Content $pathToJson

    Write-Host "AppSettings.json has been updated"
}