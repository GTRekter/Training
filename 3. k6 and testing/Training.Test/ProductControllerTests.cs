using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Training.API;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Training.Models.Store;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Training.API.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Training.Test
{
    [TestClass]
    public class ProductControllerTests
    {
        protected ApplicationDbContext _dbContext { get; private set; }
        
        [TestInitialize()]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ApplicationDbContext")
                .Options;

            _dbContext = new ApplicationDbContext(options);
            List<Product> testProducts = GetTestProducts();
            for (int i = 0; i < testProducts.Count; i++)
            {
                _dbContext.Products.Add(testProducts[i]);
            }
            _dbContext.SaveChanges();
        }

        [TestCleanup]
        public void Cleanup()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [TestMethod]
        public void GetAllProducts_ShouldReturnAllProducts()
        {
            var controller = new ProductController(_dbContext);

            List<Product> result = controller.GetAllProducts() as List<Product>;
            List<Product> testProducts = GetTestProducts();
            Assert.AreEqual(testProducts.Count, result.Count);
        }

        [TestMethod]
        public void GetProduct_ShouldReturnCorrectProduct()
        {
            var controller = new ProductController(_dbContext);

            List<Product> testProducts = GetTestProducts();
            Product result = controller.GetProduct(4) as Product;
            Assert.IsNotNull(result);
            Assert.AreEqual(testProducts[3].Name, result.Name);
        }

        [TestMethod]
        public void RemoveProduct_ShouldReturnAllProductsExceptTheRemoved()
        {
            var controller = new ProductController(_dbContext);

            List<Product> testProducts = GetTestProducts();
            controller.RemoveProduct(4);
            List<Product> result = controller.GetAllProducts() as List<Product>;
            Assert.AreNotEqual(testProducts.Count, result.Count);
        }

        [TestMethod]
        public void AddProduct_ShouldAddProduct()
        {
            var controller = new ProductController(_dbContext);

            Product testProduct = new Product { Id = 5, Name = "Demo5", Price = 18.09M };
            controller.AddProduct(testProduct);
            Product result = controller.GetProduct(5) as Product;
            Assert.AreEqual(testProduct.Name, result.Name);
        }

        [TestMethod]
        public void GetProduct_ShouldNotFindProduct()
        {
            var controller = new ProductController(_dbContext);

            var result = controller.GetProduct(999);
            Assert.IsNull(result);
        }

        private List<Product> GetTestProducts()
        {
            var testProducts = new List<Product>();
            testProducts.Add(new Product { Id = 1, Name = "Demo1", Price = 1 });
            testProducts.Add(new Product { Id = 2, Name = "Demo2", Price = 3.75M });
            testProducts.Add(new Product { Id = 3, Name = "Demo3", Price = 16.99M });
            testProducts.Add(new Product { Id = 4, Name = "Demo4", Price = 11.00M });

            return testProducts;
        }
    }
}
