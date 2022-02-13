resource "local_file" "message" {
    filename = "/mnt/c/Users/ivanporta/Desktop/${var.pnfn}-${var.psfn}-${var.psfnSensitive}.${var.extension}"
    content = var.content
}