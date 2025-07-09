# ----- Build Stage -----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Reservation.API/Reservation.API.csproj ./Reservation.API/
RUN dotnet restore ./Reservation.API/Reservation.API.csproj

COPY . .
RUN dotnet publish ./Reservation.API/Reservation.API.csproj -c Release -o /app

# ----- Runtime Stage -----
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Reservation.API.dll"]