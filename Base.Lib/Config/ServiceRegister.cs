using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.Lib.Repository;

namespace TD.Lib.Config
{
    public static class ServiceRegister
    {
        public static void LibRegisters(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped(typeof(ITDRepository<>), typeof(TDRepository<>));
        }
    }
}
