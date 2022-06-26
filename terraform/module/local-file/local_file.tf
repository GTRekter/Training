resource "local_file" "file" {
    filename = "${var.path}/output.txt"
    content = "Hello world"
}