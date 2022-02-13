package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)
func main() {
    router := gin.Default()
    router.GET("/healthcheck", getHeathCheck)
    router.Run("localhost:8080")
}
func getHeathCheck(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, {"status": "healthy"})
}