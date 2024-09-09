using AutoMapper;

namespace TD.Lib.AutoMapper
{
    public static class AutoMapperGeneric
    {
        public static TDestination Map<TSource, TDestination>(TSource source)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });

            //Create an Instance of Mapper and return that Instance
            var mapper = new Mapper(config);
            return mapper.Map<TDestination>(source);
        }
    }
}
