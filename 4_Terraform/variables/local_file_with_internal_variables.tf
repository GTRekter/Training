variable "filename" {
    type: number
}
variable "fileextension" {
    type: string
}
variable "filepath" {
    type: string
}
variable "content" {
}
resource "local_file" "message" {
    filename = var.filepath + var.filename + var.fileextension
    content = var.content
}