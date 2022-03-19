// Senzor DHT11

// připojení knihovny DHT
#include "DHT.h"
#include <ArduinoJson.h>
// nastavení čísla pinu s připojeným DHT senzorem
#define pinDHT 8

// odkomentování vyberete typ senzoru, který chcete použít.
#define typDHT11 DHT11     // DHT 11

// inicializace DHT senzoru s nastaveným pinem a typem senzoru
DHT mojeDHT(pinDHT, typDHT11);

// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store
unsigned long previousMillis = 0;        // will store last time LED was updated

// constants won't change:
const long interval = 2000;           // interval at which to blink (milliseconds)

void setup() {
  // komunikace přes sériovou linku rychlostí 9600 baud
  Serial.begin(9600);
  // zapnutí komunikace s teploměrem DHT
  mojeDHT.begin();
}

void loop() {
  // check to see if it's time to blink the LED; that is, if the difference
  // between the current time and last time you blinked the LED is bigger than
  // the interval at which you want to blink the LED.
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // pomocí funkcí readTemperature a readHumidity načteme
    // do proměnných tep a vlh informace o teplotě a vlhkosti,
    // čtení trvá cca 250 ms
    float teplota = mojeDHT.readTemperature();
    float vlhkost = mojeDHT.readHumidity();
    // kontrola, jestli jsou načtené hodnoty čísla pomocí funkce isnan
    if (isnan(teplota) || isnan(vlhkost)) {
      // při chybném čtení vypiš hlášku
      Serial.println("Chyba při čtení z DHT senzoru!");
    } else {
      // pokud jsou hodnoty v pořádku,
      // vypiš je po sériové lince
      /*Serial.print("Teplota: ");
      Serial.print(teplota);
      Serial.print("°C ");
      Serial.print("vlhkost: ");
      Serial.print(vlhkost);
      Serial.println("  %");*/
      StaticJsonDocument<100> outputJson;
      outputJson["temperature"] = teplota;
      outputJson["humidity"] = vlhkost;
      serializeJson(outputJson, Serial);
      Serial.println();
    }
  }
}
