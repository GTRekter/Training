terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
}
provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "training" {
    name     = ${var.azure_resource_group_name}
    location = "northeurope"
    tags = {
        Application = "Server"
        Scope = "Training"
    }
}
resource "azurerm_app_service_plan" "training" {  
  name                = ${var.azure_app_service_planp_name}  
  location            = "eastus"  
  resource_group_name = azurerm_resource_group.training.name  
  sku {  
    tier = "Standard"  
    size = "S1"  
  }  
}  
resource "azurerm_app_service" "training" {  
  name                = ${var.azure_web_app_name}    
  location            = "eastus"  
  resource_group_name = azurerm_resource_group.training.name  
  app_service_plan_id = azurerm_app_service_plan.training.id  
}  