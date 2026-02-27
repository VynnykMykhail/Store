using Microsoft.EntityFrameworkCore;
using Nethereum.Web3;
using StoreBackend_Db;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddRazorPages();

//builder.Services.AddDbContext<Db>();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapRazorPages();

//app.Run();




var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("SQLConnection");

builder.Services.AddDbContext<Db>(options=>options.UseSqlServer(connectionString));
builder.Services.AddControllers();



builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCors", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

//builder.Services.AddSingleton(sp =>
//{
//    var cfg = sp.GetRequiredService<IConfiguration>();
//    var rpcUrl = cfg["Blockchain:RpcUrl"];

//    if (string.IsNullOrWhiteSpace(rpcUrl))
//        throw new InvalidOperationException("Не найден Blockchain:RpcUrl в appsettings.json");

//    return new Web3(rpcUrl);
//});

var app = builder.Build();



app.UseCors("ReactCors");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();