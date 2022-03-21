const fs = require('fs');
const { parse } = require('csv-parse');

const parser = parse({
    comment: "#",
    columns: true
});

const habitablePlanets = [];

function isHabitablePlanets(planet) {
    return planet["koi_disposition"] === "CONFIRMED" 
        && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6;
}

fs.createReadStream("kepler_data.csv")
    .pipe(parser)
    .on("data", (data) => {
        if (isHabitablePlanets(data)) 
            habitablePlanets.push(data);
    })
    .on("error", (error) => console.log(error))
    .on("end", () => {
        console.log(habitablePlanets);
        console.log(`${habitablePlanets.length} habitables planets`);
    })