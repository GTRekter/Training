using System.Linq;
using System.Collections.Generic;

namespace DotNetAPI.Models;

public static class ProductManager
{
    public static void AddProduct(ApplicationDbContext context, Product product)
    {
        context.Products.Add(product);
        context.SaveChanges();
    }
    public static Product? GetProductById(ApplicationDbContext context, int id)
    {
        return context.Products.FirstOrDefault((p) => p.Id == id);
    }
    public static List<Product> GetAllProduct(ApplicationDbContext context)
    {
        return context.Products.ToList();
    }
    public static void DeleteProductById(ApplicationDbContext context, int id)
    {
        var productToRemove = context.Products.FirstOrDefault((p) => p.Id == id);
        if(productToRemove != null)
        {
            context.Products.Remove(productToRemove);
            context.SaveChanges();
        }
    }
}