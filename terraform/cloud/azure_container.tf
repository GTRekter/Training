variable "name" {
  type        = string
  default     = "training"
  description = "The name of which your resources should start with."
  validation {
    condition     = can(regex("^[0-9A-Za-z]+$", var.name))
    error_message = "Only a-z, A-Z and 0-9 are allowed to match Azure storage naming restrictions."
  }
}
variable "environment" {
  type        = string
  default     = "dev"
  description = "Sets the environment for the resources"
}
variable "region" {
  type        = string
  default     = "West Europe"
  description = "The Azure Region where the Resource Group should exist."
}
variable "vm_username" {
  type        = string
  description = "Azure Virtual Machine username"
}
variable "vm_password" {
  type        = string
  description = "Azure Virtual Machine password"
  sensitive   = true
}
locals {
  common_tags = {
    "ProjectName"  = "GitHub"
    "ActivityType" = "Demo"
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
resource "azurerm_resource_group" "resource_group" {    
  name     = "rg-${var.name}-${var.environment}" 
  location = var.region  
  tags     = local.common_tags
}   
resource "azurerm_container_registry" "acr" {
  name                = "cr-${var.name}-${var.environment}-001" 
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name 
  sku                 = "Standard"
  admin_enabled       = false
}
resource "azurerm_application_insights" "appinsights" {
  name                = "ai-${var.name}-${var.environment}-001" 
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  application_type    = "web"
  tags                = local.common_tags
}
resource "azurerm_app_service_plan" "app_service_plan" {  
  name                = "asp-${var.name}-${var.environment}-001"  
  location            = azurerm_resource_group.resource_group.location  
  resource_group_name = azurerm_resource_group.resource_group.name  
  sku {  
    tier = "Standard"  
    size = "S1"  
  }  
  tags = local.common_tags
}  
resource "azurerm_app_service" "app_service" {  
  name                = "was-${var.name}-${var.environment}-001"  
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name  
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id  
  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"              = 1
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.appinsights.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.appinsights.connection_string
  }
  tags = local.common_tags
} 
resource "azurerm_app_service_slot" "app_service_slot" {
  name                    = "staging"
  app_service_name        = azurerm_app_service.app_service.name
  location                = azurerm_resource_group.resource_group.location
  resource_group_name     = azurerm_resource_group.resource_group.name 
  app_service_plan_id     = azurerm_app_service_plan.app_service_plan.id
  https_only              = true
  client_affinity_enabled = true
  site_config {
    always_on         = "true"
  }
}
resource "azurerm_virtual_network" "virtual_network" {
  name                = "vnet-${var.name}-${var.environment}"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name  
}
resource "azurerm_subnet" "subnet" {
  name                 = "subnet-${var.name}-${var.environment}"
  resource_group_name  = azurerm_resource_group.resource_group.name  
  virtual_network_name = azurerm_virtual_network.training.name
  address_prefixes     = ["10.0.2.0/24"]
}
resource "azurerm_public_ip" "public_ip" {
  name                         = "pip-${var.name}-${var.environment}"
  location                     = azurerm_resource_group.training.location
  resource_group_name          = azurerm_resource_group.training.name
  allocation_method            = "Dynamic"
}
resource "azurerm_network_interface" "network_interface" {
  name                = "ni-${var.name}-${var.environment}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name  
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}
resource "azurerm_windows_virtual_machine" "virtual_machine" {
  name                = "vm-${var.name}-${var.environment}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name 
  size                = "Standard_D2s_v3"
  admin_username      = "${var.vm_username}"
  admin_password      = "${var.vm_password}"
  license_type        = "Windows_Client"
  network_interface_ids = [
    azurerm_network_interface.network_interface.id,
  ]
  os_disk {
    name                 = "disk-${var.name}-${var.environment}"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
    publisher = "MicrosoftWindowsDesktop"
    offer     = "Windows-10"
    sku       = "20h2-pro-g2"
    version   = "latest"
  }
}
data "azurerm_public_ip" "public_ip" {
  name                = azurerm_public_ip.public_ip.name
  resource_group_name = azurerm_resource_group.resource_group.name 
}
output "training_vm_ip" {
  value     = data.azurerm_public_ip.public_ip.ip_address
  sensitive = false
}