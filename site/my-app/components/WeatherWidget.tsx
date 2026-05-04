"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, X, MapPin, Bike, Wifi, WifiOff, Moon, Lightbulb } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  windSpeed: number;
  description: string;
  location: string;
  realData: boolean;
  error?: string;
}

interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: "sunny" | "cloudy" | "rainy";
  description: string;
  rainProbability: number;
}

export default function WeatherWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherData>({
    temp: 28,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    description: "Ensolarado",
    location: "Caldazinha, GO",
    realData: false,
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isNight, setIsNight] = useState<boolean>(false);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [showForecast, setShowForecast] = useState<boolean>(false);

  // Buscar dados reais da Open-Meteo API (gratuita, sem API key)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordenadas do Cantinho do Ciclista
        const LAT = -16.7564;
        const LON = -48.9726;
        
        // Open-Meteo API - gratuita, sem autenticação
        // Busca clima atual + previsão diária para os próximos 7 dias
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=7`
        );

        if (!response.ok) throw new Error("Falha ao buscar dados");

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;
        
        // Converter weather code WMO para nossas condições
        // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
        const weatherCode = current.weather_code;
        let condition: "sunny" | "cloudy" | "rainy" = "sunny";
        let description = "Ensolarado";
        
        if (weatherCode === 0) {
          condition = "sunny";
          description = "Céu limpo";
        } else if (weatherCode >= 1 && weatherCode <= 3) {
          condition = "cloudy";
          description = "Parcialmente nublado";
        } else if (weatherCode >= 45 && weatherCode <= 48) {
          condition = "cloudy";
          description = "Nevoeiro";
        } else if (weatherCode >= 51 && weatherCode <= 67) {
          condition = "rainy";
          description = "Chuva";
        } else if (weatherCode >= 80 && weatherCode <= 82) {
          condition = "rainy";
          description = "Chuva forte";
        } else if (weatherCode >= 95 && weatherCode <= 99) {
          condition = "rainy";
          description = "Tempestade";
        }
        
        setWeather({
          temp: Math.round(current.temperature_2m),
          condition,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          description,
          location: "Caldazinha, GO",
          realData: true,
        });

        // Processar previsão dos próximos dias
        const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const forecastData: ForecastDay[] = [];
        
        for (let i = 1; i < daily.time.length; i++) { // Começa do índice 1 (amanhã)
          const date = new Date(daily.time[i]);
          const dayCode = daily.weather_code[i];
          let dayCondition: "sunny" | "cloudy" | "rainy" = "sunny";
          let dayDescription = "Ensolarado";
          
          if (dayCode === 0) {
            dayCondition = "sunny";
            dayDescription = "Céu limpo";
          } else if (dayCode >= 1 && dayCode <= 3) {
            dayCondition = "cloudy";
            dayDescription = "Parcialmente nublado";
          } else if (dayCode >= 45 && dayCode <= 48) {
            dayCondition = "cloudy";
            dayDescription = "Nevoeiro";
          } else if (dayCode >= 51 && dayCode <= 67) {
            dayCondition = "rainy";
            dayDescription = "Chuva";
          } else if (dayCode >= 80 && dayCode <= 82) {
            dayCondition = "rainy";
            dayDescription = "Chuva forte";
          } else if (dayCode >= 95 && dayCode <= 99) {
            dayCondition = "rainy";
            dayDescription = "Tempestade";
          }
          
          forecastData.push({
            date: daily.time[i],
            dayName: i === 1 ? "Amanhã" : daysOfWeek[date.getDay()],
            tempMax: Math.round(daily.temperature_2m_max[i]),
            tempMin: Math.round(daily.temperature_2m_min[i]),
            condition: dayCondition,
            description: dayDescription,
            rainProbability: daily.precipitation_probability_max[i] || 0,
          });
        }
        
        setForecast(forecastData);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        // Fallback para dados estimados
        setWeather(prev => ({ 
          ...prev, 
          realData: false, 
          error: "API temporariamente indisponível - mostrando estimativa" 
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Atualizar a cada 10 minutos
    const weatherInterval = setInterval(fetchWeather, 600000);
    
    // Horário local de Goiânia (UTC-3) e detecção de noite
    const updateTime = () => {
      const now = new Date();
      const goianiaTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      setCurrentTime(goianiaTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
      
      // Detectar se é noite (após 18h ou antes de 6h)
      const hour = goianiaTime.getHours();
      setIsNight(hour >= 18 || hour < 6);
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    
    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const getWeatherIcon = (condition: string, size = 24) => {
    // À noite, mostrar lua em vez de sol
    if (isNight && condition === "sunny") {
      return <Moon size={size} className="text-amber-200" />;
    }
    
    switch (condition) {
      case "sunny":
        return <Sun size={size} className="text-sunset-gold" />;
      case "cloudy":
        return <Cloud size={size} className="text-wood-light" />;
      case "rainy":
        return <CloudRain size={size} className="text-blue-400" />;
      default:
        return isNight ? <Moon size={size} className="text-amber-200" /> : <Sun size={size} className="text-sunset-gold" />;
    }
  };

  const getWeatherMessage = () => {
    // Mensagens específicas para noite
    if (isNight) {
      if (weather.condition === "rainy") {
        return { emoji: "🌧️", text: "Chuva à noite? Atenção redobrada!", tip: "Use lanterna e sinalizador traseiro" };
      } else {
        return { emoji: "🌙", text: "Pedalada noturna? Cuidado extra!", tip: "Lanterna frontal e traseira obrigatórias" };
      }
    }
    
    // Mensagens para o dia
    if (weather.condition === "sunny" && weather.temp > 25) {
      return { emoji: "☀️", text: "Sol quente! Hidrate-se bastante!", tip: "Leve 2 garrafas de água" };
    } else if (weather.condition === "rainy") {
      return { emoji: "🌧️", text: "Chuva na trilha?", tip: "Capa de chuva e cuidado na descida" };
    } else if (weather.temp < 20) {
      return { emoji: "🧥", text: "Está fresco hoje!", tip: "Corta-vento recomendado" };
    } else {
      return { emoji: "🚴", text: "Dia perfeito para pedalar!", tip: "Aproveite a Trilha da Coxinha" };
    }
  };

  const message = getWeatherMessage();

  return (
    <>
      {/* Botão Flutuante Compacto */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 wood-sign rounded-full px-4 py-3 flex items-center gap-3 shadow-xl hover:scale-105 transition-transform"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Ícone animado */}
        <motion.div
          animate={{ 
            rotate: weather.condition === "sunny" ? [0, 360] : 0,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          {getWeatherIcon(weather.condition, 20)}
        </motion.div>

        {/* Temperatura */}
        <span className="font-display text-cream text-lg">{weather.temp}°</span>

        {/* Indicador de dados reais */}
        {weather.realData ? (
          <Wifi size={12} className="text-green-400" />
        ) : (
          <WifiOff size={12} className="text-cream/40" />
        )}
      </motion.button>

      {/* Popup Expandido */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none"
          >
            {/* Overlay escuro */}
            <div 
              className="absolute inset-0 bg-forest-dark/60 pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            {/* Card do Clima */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative wood-sign rounded-2xl p-6 w-full max-w-sm pointer-events-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-cream/10 text-cream/70 hover:bg-cream/20 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header com Local e Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-sunset-gold" />
                  <span className="font-rustic text-amber-300 text-xs tracking-wider">{weather.location.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1">
                  {weather.realData ? (
                    <span className="flex items-center gap-1 text-[10px] text-green-400 font-rustic">
                      <Wifi size={10} /> TEMPO REAL
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-cream/40 font-rustic">
                      <WifiOff size={10} /> ESTIMATIVA
                    </span>
                  )}
                </div>
              </div>

              {/* Temperatura Principal */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      rotate: weather.condition === "sunny" ? [0, 360] : [0, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: weather.condition === "sunny" ? 8 : 4, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center"
                  >
                    {getWeatherIcon(weather.condition, 32)}
                  </motion.div>
                  <div>
                    <motion.span 
                      className="font-display text-5xl text-cream"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {weather.temp}°
                    </motion.span>
                    <p className="font-rustic text-cream/60 text-sm capitalize">{weather.description}</p>
                  </div>
                </div>
              </div>

              {/* Stats em Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-cream/10 rounded-lg p-3 text-center">
                  <Droplets size={16} className="mx-auto mb-1 text-blue-400" />
                  <p className="font-display text-lg text-cream">{weather.humidity}%</p>
                  <p className="font-rustic text-xs text-cream/50">Umidade</p>
                </div>
                <div className="bg-cream/10 rounded-lg p-3 text-center">
                  <Wind size={16} className="mx-auto mb-1 text-amber-300" />
                  <p className="font-display text-lg text-cream">{weather.windSpeed}</p>
                  <p className="font-rustic text-xs text-cream/50">km/h</p>
                </div>
              </div>

              {/* Mensagem Divertida */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-amber-500/20 to-sunset-gold/20 rounded-lg p-3 mb-3"
              >
                <p className="font-body text-cream text-sm">
                  <span className="text-lg">{message.emoji}</span> {message.text}
                </p>
              </motion.div>

              {/* Dica */}
              <p className="font-rustic text-xs text-cream/60 text-center">
                💡 {message.tip}
              </p>

              {/* Previsão do dia seguinte (sempre visível à noite ou quando quiser planejar) */}
              {forecast.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-3 border-t border-cream/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-rustic text-xs text-amber-300">
                      {isNight ? "🌙 Amanhã" : "📅 Próximos dias"}
                    </p>
                    <button
                      onClick={() => setShowForecast(!showForecast)}
                      className="font-rustic text-[10px] text-cream/50 hover:text-cream/80 transition-colors"
                    >
                      {showForecast ? "Ocultar" : "Ver semana →"}
                    </button>
                  </div>
                  
                  {/* Card do próximo dia (Amanhã) */}
                  <div className="bg-cream/5 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(forecast[0].condition, 20)}
                      <div>
                        <p className="font-rustic text-xs text-cream font-medium">{forecast[0].dayName}</p>
                        <p className="font-rustic text-[10px] text-cream/50">{forecast[0].description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-sm text-cream">{forecast[0].tempMax}° / {forecast[0].tempMin}°</p>
                      {forecast[0].rainProbability > 0 && (
                        <p className="font-rustic text-[10px] text-blue-300">🌧️ {forecast[0].rainProbability}%</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Lista completa da semana (expandível) */}
                  <AnimatePresence>
                    {showForecast && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {forecast.slice(1, 5).map((day, index) => (
                          <motion.div
                            key={day.date}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-cream/5 rounded-lg p-2 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getWeatherIcon(day.condition, 16)}
                              <p className="font-rustic text-[10px] text-cream/80">{day.dayName}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {day.rainProbability > 0 && (
                                <span className="font-rustic text-[10px] text-blue-300">{day.rainProbability}%</span>
                              )}
                              <span className="font-display text-xs text-cream/70">{day.tempMax}° / {day.tempMin}°</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Horário local e disclaimer */}
              <div className="mt-4 pt-3 border-t border-cream/10 text-center">
                <p className="font-rustic text-xs text-cream/40">
                  🕐 {currentTime} (Horário de Brasília)
                </p>
                {!weather.realData && weather.error && (
                  <p className="font-rustic text-[10px] text-cream/30 mt-1">
                    *{weather.error}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
