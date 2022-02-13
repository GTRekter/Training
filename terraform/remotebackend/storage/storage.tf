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
  name     = "rg-training-dev-westeu-001"
  location = "northeurope"
  tags = {
    Application = "Server"
    Scope       = "Training"
  }
}
resource "azurerm_storage_account" "training" {
  name                     = "satrainingdev"
  resource_group_name      = azurerm_resource_group.training.name
  location                 = azurerm_resource_group.training.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  tags = {
    Application = "Server"
    Scope       = "Training"
  }
}
resource "azurerm_storage_container" "training" {
  name                  = "terraform"
  storage_account_name  = azurerm_storage_account.training.name
  container_access_type = "private"
}