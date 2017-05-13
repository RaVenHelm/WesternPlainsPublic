using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WesternPlains.App.Adapters;
using WesternPlains.App.Repositories;

namespace WesternPlains.App
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            // Also all camel-case JSON response

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                  builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    );
            });

            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });
            services.AddDistributedMemoryCache();
            services.AddSession(o => {
                o.IdleTimeout = TimeSpan.FromMinutes(15);
                o.CookieHttpOnly = true;
            });
            services.AddSingleton<IConfigurationRoot>(Configuration);
            services.AddSingleton<IDatabaseRepository, MySqlRepository>();
            services.AddTransient<IReaderAdapter, MySqlReaderAdapter>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddFile(@"log\err--{Date}.log", LogLevel.Error);
            loggerFactory.AddDebug();

            app.Use(async (context, next) => {
                try
                {
                    await next();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Magenta;
                    Console.WriteLine(ex.StackTrace);
                    throw;
                }
            });

            if (env.IsDevelopment())
            {
                app.UseStatusCodePages();
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            app.UseSession();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
