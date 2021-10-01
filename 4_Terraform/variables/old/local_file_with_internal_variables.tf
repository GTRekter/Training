variable "filename" {
}
variable "content" {
}
resource "local_file" "message" {
    filename = var.filename
    content = var.content
}