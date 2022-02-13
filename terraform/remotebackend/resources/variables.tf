variable "admin_username" {
  type          = string
  description   = "Windows virtual machine username"
  sensitive     = true
}
variable "admin_password" {
  type          = string
  description   = "Windows virtual machine password"
  sensitive     = true
}