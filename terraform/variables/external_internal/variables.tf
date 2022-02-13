variable "content" {
}
variable "pnfn" {
    type = number
    default = 0
    description = "File's number used to define the filename"
}
variable "psfn" {
    type = string
    default = "file"
    description = "Partial filename"
}
variable "psfnSensitive" {
    type = string
    default = "number"
    description = "Partial filename but sensitive"
    sensitive = true
}
variable "extension" {
    type = string
    description = "File's extension. Value accepted: txt, jpg"
    validation {
        condition = anytrue([var.extension == "txt", var.extension == "jpg"])
        error_message = "Extension not supported! Change it to txt or jpg."
    }
}