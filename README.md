# Servisofts Charts
servisofts-charts es una libreria para react-native y react-web, que nos permite crear graficos de manera sensilla.

## Dependencis
```json
    "react": "*",
    "react-native": "*",
    "react-native-web": "*",
    "react-native-svg-transformer": "^0.14.3",
    "react-native-svg": "*"
```


## Install

```bash
    npm install --save servisofts-charts
```

## Usage

Para crear un grafico primero nesecitamos procesar y ordenar los datos para crear nuestra tabla de frecuencias.

La agrupacion de datos puede ser de dos tipos:
#### - (Simple.)  La key del objeto puede se cualquier tipo de dato que aga referencia al intervalo y siempre tiene como valor la frecuencia o valor del intervalo de tipo NUMBER.

```json
{ 
    "Personas":10, 
    "Hombres":4,
    "Mujeres":6,
 }
```
```json
{ 
    "2023-01":10, 
    "2023-02":4,
    "2023-03":6,
    "2023-04":7,
 }
```
#### - (Agrupada.) El intervalo de nivel 1 no se tiene que repetir, El intervalo de nivel 2 puede o no repetirse, El valor NUMBER se asigna al intervalo de nivel 2.

 



```json
{ 
    "2023-01-01":{
        "Hombres":4,
        "Mujeres":6,
    }, 
    "2023-01-02":{
        "Hombres":8,
        "Mujeres":12,
    }, 
    "2023-01-03":{
        "Hombres":7,
        "Mujeres":9,
    }, 
 }
```




