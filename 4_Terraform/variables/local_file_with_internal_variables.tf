variable "content" {
}
resource "local_file" "message" {
    filename = "/mnt/c/Users/ivanporta/Desktop/output.txt"
    content = var.content
}