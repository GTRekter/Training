variable "filename" {
    type = number
}
variable "extension" {
    type = string
}
variable "content" {
}
resource "local_file" "message" {
    filename = "/mnt/c/Users/ivanporta/Desktop/${var.filename}.${var.extension}"
    content = var.content
}