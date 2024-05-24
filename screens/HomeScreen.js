import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { fetchWeatherForecast } from '../api/weather.js'; 
import * as Progress from 'react-native-progress'; 

const HomeScreen = () => {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        fetchWeatherForecast({
            country: 'Malaysia',
            days: '7',
        }).then(data => {
            setWeather(data);
            setLoading(false);
        });
    }

    const { current, location, forecast } = weather;

    const theme = {
        bgWhite: opacity => `rgba(255,255,255, ${opacity})`
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Progress.CircleSnail thickness={5} size={60} color='#0bb3b2' />
                </View>
            ) : (
                <SafeAreaView style={{ flex: 1, marginTop: 12 }}>
                    <View style={{ justifyContent: 'space-around', flex: 1, marginVertical: 12 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 12 }}>
                            {location?.name}
                            <Text>
                                {', ' + (location?.country || 'Malaysia')}
                            </Text>
                        </Text>

                        <View>
                            <Image source={{ uri: 'https:' + current?.condition?.icon }}
                                style={{ width: 160, height: 160 }}
                            />
                        </View>

                        <View>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 48, marginLeft: 5 }}>
                                {current?.temp_c}&#176;
                            </Text>
                            <Text style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                {current?.condition?.text}
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {forecast?.forecastday?.map((item, index) => {
                            let date = new Date(item.date);
                            let options = { weekday: 'long' };
                            let dayName = date.toLocaleDateString('en-US', options);

                            return (
                                <View
                                    key={index}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 96,
                                        borderRadius: 24,
                                        paddingVertical: 12,
                                        marginRight: 16,
                                        backgroundColor: theme.bgWhite(0.15)
                                    }}
                                >
                                    <Image source={{ uri: 'https:' + item?.day?.condition?.icon }}
                                        style={{ height: 44, width: 44 }}
                                    />
                                    <Text style={{ color: 'white' }}>{dayName}</Text>
                                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{item?.day?.avgtemp_c}&#176;</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </SafeAreaView>
            )}
        </View>
    );
}

export default HomeScreen;