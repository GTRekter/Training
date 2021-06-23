using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Training.Models.Store;

namespace Training.API.Controllers
{
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
            Product.AddProduct(_context, product);
        }

        [HttpPost]
        [Route("RemoveProduct")]
        public void RemoveProduct(int id)
        {
            Product.RemoveProductById(_context, id);
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            return Product.GetAllProduct(_context);
        }

        [HttpGet]
        [Route("GetProduct")]
        public Product GetProduct(int id)
        {
            return Product.GetProductById(_context, id);
        }
    }
}
