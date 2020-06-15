const degreeTypes = {
  celsius: 'celsius',
  fahrenheit: 'fahrenheit',
};

const convertTemperatureTest = jest.fn((degree, degreeType) => {
  const result = degreeType !== degreeTypes.fahrenheit ? degree : (degree * 9) / 5 + 32;
  return Math.round(result);
});

describe('convert temperature', () => {
  it('degree types should be object containing properties fahrenheit and celsius', () => {
    expect(Object.keys(degreeTypes)).toEqual(expect.arrayContaining(['fahrenheit', 'celsius']));
  });

  it('should return degrees for celsius if type is not given', () => {
    const result = convertTemperatureTest(0);
    expect(result).toBe(0);
  });

  it('should round result', () => {
    const result = convertTemperatureTest(3, degreeTypes.fahrenheit);
    expect(result).not.toBe(37.4);
  });

  describe('should convert from celsius to fahrenheit', () => {
    it('3°C in °F', () => {
      const result = convertTemperatureTest(3, degreeTypes.fahrenheit);
      expect(result).toBe(37);
    });

    it('0°C in °F', () => {
      const result = convertTemperatureTest(0, degreeTypes.fahrenheit);
      expect(result).toBe(32);
    });

    it('-30°C in °F', () => {
      const result = convertTemperatureTest(-30, degreeTypes.fahrenheit);
      expect(result).toBe(-22);
    });
  });
});
