using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DotNetAPI.Models;

namespace DotNetAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("AddProduct")]
    public void AddProduct(Product product)
    {
        // Introduce a bug
        ProductManager.AddProduct(_context, product);   
        ProductManager.AddProduct(_context, null);
    }

    [HttpPost]
    [Route("DeleteProductById")]
    public void DeleteProductById(int id)
    {
        // Add a bug
        //ProductManager.DeleteProductById(_context, id);
    }

    [HttpGet]
    [Route("GetAllProducts")]
    public IEnumerable<Product> GetAllProducts()
    {
        return ProductManager.GetAllProduct(_context);
    }

    [HttpGet]
    [Route("GetProduct")]
    public Product? GetProduct(int id)
    {
        return ProductManager.GetProductById(_context, id);
    }
}