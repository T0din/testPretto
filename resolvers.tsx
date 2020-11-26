import axios from 'axios';

interface DataFromTrustpilote {
    total: number,
    next_cursor: number,
    reviews: [ReviewsFromTruspilote],
  };

  interface ReviewsFromTruspilote {
    id: number,
    rate: number,
    reviewer: string,
    assigned_to: string | null,
    title: string,
    content: string | null,
    created_at: Date,
    public_url : string,
  }

  interface ExpectedUser {
    id: number,
    averageRate: number,
    name: string,
    pictureUrl: string,
    reviews: [ExpectedReviews],
    reviewsCount: number,
    reviewsCountOnRate: [{ rate5: number }, { rate4: number }, { rate3: number }, { rate2: number }, { rate1: number }],
  }

  interface ExpectedReviews {
    id: number,
    content: string| null,
    createdAt: Date,
    rate: number,
    reviewer: string,
    title: string,
  }

const APITrustpilotFakeData = {
    total: 1254,
    next_cursor: 754236,
    reviews: [
        {
            id: 810345, // Int, not null
            rate: 4, // Int 1-5, not null
            reviewer: 'Jean-Luc', // String, not null
            assigned_to: 'robert@pretto.fr', // String, nullable
            title: 'Super!', // String, not null
            content: 'Lorem Ipusm ....', // String, nullable
            created_at: '2020-10-18T10:16:02Z', // String, ISO8601, not null
            public_url: 'https://fake-trustpilot.com/pretto/811345', // String, URL, not null
        },
    ],
};

const APIAirTableFakeData = {
    items: [
        {
            id: 1,
            name: 'Robert',
            phone: 0o102030405,
            email: 'robert@pretto.fr',
            home_address: '1 rue de la paix, Paris',
            gender: 'Male',
            picture_url: 'https://cdn/robert_2.jpg',
        },
    ],
};

const urlTrustpilot = 'https://api.faketrustpilot.com/reviews?limit=10'; // -u pretto:password
const urlAirTable = 'https://api.airtable.com/pretto-team/items'; // -u pretto:password

const getAverageRate = ({ rate1, rate2, rate3, rate4, rate5, numberOfRates }) => 
Math.round(((rate1 + rate2*2 + rate3*3 + rate4*4 + rate5*5 )/numberOfRates) * 10) / 10 

export const resolverUser = async ({ id }:{id:string}):ExpectedUser => {
    const dataFromTrustpilote:DataFromTrustpilote = (await axios.get(urlTrustpilot)) || APITrustpilotFakeData;
    const dataFromAirtable = (await axios.get(urlAirTable)) || APIAirTableFakeData;

    const user = dataFromAirtable.items.filter(item => item.id === id);
    // I should do the same kind of treatment for the reviews as i did to the user
    const userReviews = dataFromTrustpilote.reviews.filter(review => review.assigned_to === user.email);
    const filteredUser = ['phone', 'home_address','gender','email','picture_url'].forEach(key => {
        if(key === 'picture_url'){
            Object.defineProperty(user, 'pictureUrl',
                Object.getOwnPropertyDescriptor(user, 'picture_url'));
            delete user['picture_url'];
        } else delete user[key];
    });

    let rate1 = 0;
    let rate2 = 0;
    let rate3 = 0;
    let rate4 = 0;
    let rate5 = 0;
    userReviews.forEach(review => {
        if(review.rate === 1)
            rate1++;
        if(review.rate === 2)
            rate2++;
        if(review.rate === 3)
            rate3++;
        if(review.rate === 4)
            rate4++;
        if(review.rate === 5)
            rate5++;
    })

    const numberOfRates = userReviews.length;

    const upgradedUser = {
        ...filteredUser, 
        reviewsCount : numberOfRates, 
        reviewsCountOnRate:{
            rate5,
            rate4,
            rate3,
            rate2,
            rate1,
            },
        averageRate: getAverageRate({ rate1, rate2, rate3, rate4, rate5, numberOfRates }),
}

    return { ...upgradedUser, reviews:userReviews };
};
 