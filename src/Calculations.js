const calculate = (gapNumber, gapSize, period, wavelength) => {
    const I0 = 1;

    const size = 10000;
    const start = 0.001;
    const step = 2 * start / size;
    const arg = Array.from({length: size}, (_, i) => -start + i * step);

    const I = [];

    for (var i = 0; i < size; ++i) {
        const f = arg[i];

        const tmp1 = Math.PI * period * Math.sin(f) / wavelength;
        const tmp2 = Math.PI * gapSize * Math.sin(f) / wavelength;

        const ch1 = Math.pow(Math.sin(gapNumber * tmp1), 2);
        const del1 = Math.pow(Math.sin(tmp1), 2);

        const ch2 = Math.pow(Math.sin(tmp2), 2);
        const del2 = Math.pow(tmp2, 2);

        I.push(I0 * ch1 / del1 * ch2 / del2);
    }

    return arg.map((rValue, index) => ({r: rValue, I: I[index]}));
};

export {calculate};