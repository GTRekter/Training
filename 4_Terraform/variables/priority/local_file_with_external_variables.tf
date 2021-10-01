resource "local_file" "message" {
    filename = "/mnt/c/Users/ivanporta/Desktop/file-${var.psfn}.txt"
    content = "Hello World"
}