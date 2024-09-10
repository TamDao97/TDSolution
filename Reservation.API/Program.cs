using Reservation.API.Configs;
using TD.Lib.Config;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.LibRegisters(builder.Configuration);
builder.Services.DataContextRegisters(builder.Configuration);
builder.Services.DependencyInjection(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
