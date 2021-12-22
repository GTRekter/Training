using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Training.Models.Managers;
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
            ProductManager.AddProduct(_context, product);
        }
        
        [HttpPost]
        [Route("AddTestProduct")]
        public void AddTestProduct(Product product)
        {
            // Todo..
            // Todo2..
        }

        [HttpPost]
        [Route("AddTest2Product")]
        public void AddTest2Product(Product product)
        {
            // Todo..
            // Todo3..
        }

        [HttpPost]
        [Route("DeleteProductById")]
        public void DeleteProductById(int id)
        {
            ProductManager.RemoveProductById(_context, id);
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            return ProductManager.GetAllProduct(_context);
        }

        [HttpGet]
        [Route("GetProduct")]
        public Product GetProduct(int id)
        {
            return ProductManager.GetProductById(_context, id);
        }
    }
}
