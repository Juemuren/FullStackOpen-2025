const TARGET = 2

const calculateExercises = (times: number[]): object => {
    const periodLength = times.length
    let trainingDays = 0
    let count = 0
    const target = TARGET

    for (var i = 0; i < periodLength; i++) {
        if (times[i] > 0) {
            trainingDays += 1
            count += times[i]
        }
    }
    const average = count / periodLength

    let success: boolean
    if (average > target) {
        success = true
    } else {
        success = false
    }

    let rating: number
    let ratingDescription: string
    if (average < 1) {
        rating = 1
        ratingDescription = 'too bad'
    } else if (average < 2) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else {
        rating = 3
        ratingDescription = 'very well'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))