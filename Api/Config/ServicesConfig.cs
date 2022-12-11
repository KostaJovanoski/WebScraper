using System.Text;
using Api.Contracts;
using Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Api.Config;

public static class ServicesConfig
{
    /// <summary>
    /// Allowed domains
    /// </summary>
    private static readonly string[] AllowedDomains =
    {
        "http://localhost:3000"
    };

    /// <summary>
    /// Common app configuration
    /// </summary>
    /// <param name="services"></param>
    /// <param name="builder"></param>
    public static void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Crven Krst Api", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });
        builder.Services.AddHttpContextAccessor();

        // Validation of JWT Bearer Token
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Authentication:Issuer"],
                ValidAudience = builder.Configuration["Authentication:Audience"],
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Authentication:Secret"]))
            };
        });
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddHttpClient();

        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<ICryptoService, CryptoService>();
        builder.Services.AddScoped<IAuthenticateService, AuthenticateService>();
        ConfigureCors(builder);
        ConfigureEfCore(builder);
    }

    /// <summary>
    /// Configure CORS
    /// </summary>
    /// <param name="builder"></param>
    static void ConfigureCors(WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
    }

    /// <summary>
    /// Configure EF Core
    /// </summary>
    /// <param name="builder"></param>
    static void ConfigureEfCore(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<EfCoreConfig>(options =>
        {
            string dbPath = Path.Join(Environment.CurrentDirectory, "db", "users.db");
            options.UseSqlite($"Data Source={dbPath}");
        });
    }
}