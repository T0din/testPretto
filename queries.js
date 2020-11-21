query users {
    user {
        name
        averageRate
        pictureUrl
        reviewsCount
        review {
                rate
                createdAt
                content
                title
                reviewer
            }
        }
}

query user (id:ID!, rateFilter: [Int], after :???, limit :???) {
    user {
        name
        averageRate
        pictureUrl
        reviewsCount
        reviewsCountOnRate {
                rateNumberOfReviews1
                rateNumberOfReviews2
                rateNumberOfReviews3
                rateNumberOfReviews4
                rateNumberOfReviews5
            }
        review {
            rate
            createdAt
            content
            title
            reviewer
    }
}
}

