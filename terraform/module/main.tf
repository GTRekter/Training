module "first_module" {
  source  = "./local-file"
  path    = "C:/Users/ivanp/Desktop"
}
module "second_module" {
  source  = "./local-file"
  path    = "C:/Users/ivanp/Desktop"
}
module "third_module" {
  source  = "./local-image"
  path    = "C:/Users/ivanp/Desktop"
}