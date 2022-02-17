variable "name" {
  type = string
  default = "sst"
  description = "The name of which your resources should start with."
  validation {
    condition = can(regex("^[0-9A-Za-z]+$", var.name))
    error_message = "Only a-z, A-Z and 0-9 are allowed to match Azure storage naming restrictions."
  }
}
variable "environment" {
  type = string
  default = "dev"
  description = "Sets the environment for the resources"
}
variable "region" {
  type = string
  default = "West Europe"
  description = "The Azure Region where the Resource Group should exist."
}
locals {
  common_tags = {
    "ProjectName"  = "SST"
    "ActivityType" = "Umbrella"
    "Client"       = "Telecom"
  }
}
terraform {    
  required_providers {    
    azurerm = {    
      source = "hashicorp/azurerm"    
    }    
  }    
}    
provider "azurerm" {    
  features {}    
}    
resource "azurerm_resource_group" "sst_resource_group" {    
  name = "rg-${var.name}-${var.environment}" 
  location = var.region  
  tags = local.common_tags
}   
resource "azurerm_application_insights" "sst_appinsights" {
  name                = "ai-${var.name}-${var.environment}-001" 
  location            = azurerm_resource_group.sst_resource_group.location
  resource_group_name = azurerm_resource_group.sst_resource_group.name
  application_type    = "web"
  tags = local.common_tags
}
resource "azurerm_app_service_plan" "sst_app_service_plan" {  
  name                = "asp-${var.name}-${var.environment}-001"  
  location            = azurerm_resource_group.sst_resource_group.location  
  resource_group_name = azurerm_resource_group.sst_resource_group.name  
  sku {  
    tier = "Standard"  
    size = "S1"  
  }  
  tags = local.common_tags
}  
resource "azurerm_app_service" "sst_app_service" {  
  name                = "was-${var.name}-${var.environment}-001"  
  location            = azurerm_resource_group.sst_resource_group.location
  resource_group_name = azurerm_resource_group.sst_resource_group.name  
  app_service_plan_id = azurerm_app_service_plan.sst_app_service_plan.id  
  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"              = 1
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.sst_appinsights.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.sst_appinsights.connection_string
  }
  tags = local.common_tags
} 
resource "azurerm_communication_service" "sst_communication_service" {
  name                = "acs-${var.name}-${var.environment}-001"
  resource_group_name = azurerm_resource_group.sst_resource_group.name
  data_location       = "Europe" // [Asia Pacific Australia Europe UK United States]
  tags = local.common_tags
}
