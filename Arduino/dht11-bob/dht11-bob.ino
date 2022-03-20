#include <dht.h>
#include <ArduinoJson.h>

dht DHT;

#define DHT11_PIN 8

unsigned long previousMillis = 0;

// constants won't change:
const long interval = 5000;           // interval at which to blink (milliseconds)

void setup(){
  Serial.begin(9600);
}

void loop(){

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    
  
    // pomocí funkcí readTemperature a readHumidity načteme
    // do proměnných teplota a vlhkost informace o teplotě a vlhkosti,
    // čtení trvá cca 250 ms
    DHT.read11(DHT11_PIN);
    float teplota = DHT.temperature;
    float vlhkost = DHT.humidity;
    // kontrola, jestli jsou načtené hodnoty čísla pomocí funkce isnan
    if (isnan(teplota) || isnan(vlhkost)) {
      // při chybném čtení vypiš hlášku
      Serial.println("Chyba při čtení z DHT senzoru!");
    } else {
      // pokud jsou hodnoty v pořádku,
      // vypiš je po sériové lince
    
  StaticJsonDocument<100> testDocument;

  long int timeinms = millis();
  testDocument["msstart"] = timeinms;
  testDocument["temperature"] = teplota;
  testDocument["humidity"] = vlhkost;
  
  char buffer[100];
  
  serializeJsonPretty(testDocument, buffer);
  
  Serial.println(buffer);
  
  
  }
}
}
