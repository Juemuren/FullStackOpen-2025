const calculateBmi = (height: number, weight: number): string => {
    const bmi = 10000 * weight / (height * height)
    if (bmi < 18.5) {
        return "Underweight"
    }
    else if (bmi < 24.9) {
        return "Normal range"
    }
    else if (bmi < 29.9) {
        return "Overweight"
    }
    else {
        return "Obese"
    }
}

console.log(calculateBmi(180, 74))