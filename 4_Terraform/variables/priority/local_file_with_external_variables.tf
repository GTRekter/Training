resource "local_file" "message" {
    filename = "/mnt/c/Users/ivanporta/Desktop/file-${var.pnfn}.txt"
    content = "Hello World"
}